import React from 'react';
import { FormStoreContext } from './context';

type Defaults = Record<string | symbol, any>;

type Listener = (name: string) => void;

interface Rule {
  validator: (val: any) => Error;
}

export type Rules = Record<string, Rule>;

type Error = [validateRes: boolean, validateMsg: string];

type Errors = Record<string, Error>;

export class FormStore {
  public defaults: Defaults;
  public values: Defaults;
  public listeners: Listener[];
  public rules: Rules;
  public errors: Errors;
  public constructor(defaults: Defaults, rules: Rules) {
    this.defaults = JSON.parse(JSON.stringify(defaults));
    this.values = defaults;
    this.listeners = [];
    this.rules = rules;
    this.errors = {};
  }

  public subscribe(listener: Listener) {
    this.listeners.push(listener);
    return () => {
      const idx = this.listeners.indexOf(listener);
      idx > -1 && this.listeners.splice(idx, 1);
    };
  }

  public notify(name: string) {
    this.listeners.forEach((listener) => {
      listener(name);
    });
  }

  public get(name?: string) {
    return name === undefined ? this.values : this.values[name];
  }

  public set(name: string, value: any) {
    if (typeof name === 'string') {
      this.values[name] = value;
      this.validate(name);
      this.notify(name);
    }
  }

  public error(name?: string, value?: string) {
    // 记录错误
    const args = arguments;

    if (args.length === 0) {
      // 获取全部错误
      return this.errors;
    } else if (typeof name === 'string') {
      if (value === undefined) {
        // 删除错误

        delete this.errors[name];
      } else {
        // 设置错误
        this.errors[name] = [false, value];
      }
      return this.errors[name];
    }
  }

  public validate(name?: string) {
    if (name === undefined) {
      // 校验整个表单域
      Object.keys(this.rules).forEach((name) => {
        this.validate(name);
      });
      this.notify('*');
      return this.error();
    }
    const rule: Rule = this.rules[name!];
    const value = this.get(name);
    const result = rule.validator ? rule.validator(value)[0] : true;

    const error = this.error(name, result ? undefined : rule.validator(value)[1] || '校验出错') as Error;

    return error;
  }

  public reset() {
    this.values = JSON.parse(JSON.stringify(this.defaults));
    this.notify('*');
  }
}
interface Props {
  store: FormStore;
  onSubmit: (e: React.FormEvent) => void;
  className?: string;
}

export const Form: React.FC<Props> = (props) => {
  const { store, children, onSubmit, className } = props;
  return (
    <FormStoreContext.Provider value={store}>
      <form onSubmit={onSubmit} className={className}>
        {children}
      </form>
    </FormStoreContext.Provider>
  );
};
