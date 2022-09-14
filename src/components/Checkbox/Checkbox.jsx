import React, { useEffect, useRef } from 'react';

export const Checkbox = React.forwardRef(({ indeterminate, className, ...rest }, ref) => {
  const defaultRef = useRef();
  const resolvedRef = ref || defaultRef;

  useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate;
  }, [resolvedRef, indeterminate]);

  return (
    <>
      <input type="checkbox" ref={resolvedRef} className={className} {...rest} />
    </>
  );
});
