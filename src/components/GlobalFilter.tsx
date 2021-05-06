import React, { useState } from 'react';
import { useAsyncDebounce } from 'react-table';

type Props = {
  filter: string;
  setFilter: (value: string) => void;
};

export default function GlobalFilter({ filter, setFilter }: Props) {
  const [value, setValue] = useState(filter);

  const onChange = useAsyncDebounce((value) => {
    console.log(`onChange`);
    setFilter(value || undefined);
  }, 1000);

  return (
    <div>
      <span>
        Search:{' '}
        <input
          type="text"
          value={value || ''}
          onChange={(e) => {
            setValue(e.target.value);
            onChange(e.target.value);
          }}
        />
      </span>
    </div>
  );
}
