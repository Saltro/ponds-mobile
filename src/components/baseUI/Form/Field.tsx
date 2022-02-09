import React, { cloneElement, isValidElement, useCallback, useContext, useEffect, useState } from 'react';
import { FormStoreContext } from './context';

interface Props {
  label?: string;
  name: string;
}

const valueGetter = (event: React.ChangeEvent<HTMLInputElement>) => {
  return event?.target ? (event.target.type === 'checkbox' ? event.target.checked : event.target.value) : event;
  // return event && event.target ? (event.target.type === 'checkbox' ? event.target.checked : event.target.value) : event;
};

export const Field: React.FC<Props> = (props) => {
  const { label, name, children } = props;
  const store = useContext(FormStoreContext);

  const [value, setValue] = useState(name && store ? store.get(name) : undefined);
  // const [error, setError] = useState(name && store ? store.error(name) : undefined);

  const onChange = useCallback((...args) => name && store && store.set(name, valueGetter(...args)), [name, store]);

  useEffect(() => {
    if (!name || !store) return;
    return store.subscribe((n) => {
      if (n === name || n === '*') {
        setValue(store.get(name));
        // setError(store.error(name));
      }
    });
  }, [name, store]);
  let child = children;

  if (name && store && isValidElement(child)) {
    const childProps = { value, onChange };
    child = cloneElement(child, childProps);
  }
  return (
    <div className="form">
      {label && <label className="form-label">{label}</label>}
      <div className="form-content">
        <div className="form-control">{child}</div>
        {/* <div className="form-message">{error}</div> */}
      </div>
    </div>
  );
};
