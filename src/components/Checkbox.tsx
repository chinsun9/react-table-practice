import React, { forwardRef, useEffect, useRef } from 'react';

type PropsType = {
  indeterminate?: boolean;
};

export const Checkbox = forwardRef<HTMLInputElement, PropsType>(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = useRef<HTMLInputElement>();
    const resolveRef = (ref || defaultRef) as any;

    useEffect(() => {
      if (!resolveRef.current) return;
      resolveRef.current.indeterminate = indeterminate || false;
    }, [indeterminate, resolveRef]);

    return (
      <>
        <input type="checkbox" ref={resolveRef} {...rest} />
      </>
    );
  },
);
