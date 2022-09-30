import React, { useEffect, useRef } from 'react';
import { CheckedInputIcon, UncheckedInputIcon } from '../Icons';

export const Checkbox = React.forwardRef(
  ({ indeterminate, id, checked, className, ...rest }, ref) => {
    const defaultRef = useRef();
    const resolvedRef = ref || defaultRef;

    useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
      <>
        <input
          hidden
          id={id}
          type="checkbox"
          ref={resolvedRef}
          checked={checked}
          className={className}
          {...rest}
        />
        <label htmlFor={id} className="cursor-pointer">
          {checked ? <CheckedInputIcon /> : <UncheckedInputIcon />}
        </label>
      </>
    );
  },
);
