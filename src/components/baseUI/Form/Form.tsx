import React from 'react';
import { FormStoreContext } from './context';

type Defaults = Record<string | symbol, any>;

type Listener = (name: string) => void;

// type Rule = (name: string, values: any) => boolean | string;

// type Rules = Record<string, Rule>;

export class FormStore {
  public defaults: Defaults;
  public values: Defaults;
  public listeners: Listener[];
  // public rules: Rules;
  // public errors: any;
  public constructor(defaults: Defaults) {
    this.defaults = JSON.parse(JSON.stringify(defaults));
    this.values = defaults;
    this.listeners = [];
    // this.rules = rules;
    // this.errors = {};
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
      // this.validate(name);
      this.notify(name);
    }
  }

  // public error(name: string | number, value?: any) {
  //   const args = arguments;

  //   if (args.length === 0) return this.errors;

  //   if (typeof name === 'number') {
  //     name = Object.keys(this.errors)[name];
  //   }

  //   if (args.length === 2) {
  //     if (value === undefined) {
  //       delete this.errors[name];
  //     } else {
  //       this.errors[name] = value;
  //     }
  //   }
  //   return this.errors[name];
  // }

  // public validate(name?: string) {
  //   if (name === undefined) {
  //     // 校验整个表单域
  //     Object.keys(this.rules).forEach((rule) => {
  //       this.validate(rule);
  //     });
  //     this.notify('*');
  //     return [this.error(0), this.get()];
  //   }
  //   const validator = this.rules[name!];
  //   const value = this.get(name);
  //   const result = validator ? validator(value!, this.values) : true;

  //   const message = this.error(name, result ? undefined : result || '');

  //   const error = message === undefined ? undefined : new Error(message);
  //   return [error, value];
  // }

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
