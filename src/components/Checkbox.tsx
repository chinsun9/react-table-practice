import React, { forwardRef, useEffect, useRef } from 'react';

type PropsType = {
  indeterminate?: boolean;
};

export const Checkbox = forwardRef<HTMLInputElement, PropsType>(
  ({ indeterminate = false, ...rest }, ref) => {
    const defaultRef = useRef<HTMLInputElement>();
    const resolveRef = (ref || defaultRef) as any;

    useEffect(() => {
      if (!resolveRef.current) return;
      resolveRef.current.indeterminate = indeterminate;
    }, [indeterminate, resolveRef]);

    return <input type="checkbox" ref={resolveRef} {...rest} />;
  },
);
