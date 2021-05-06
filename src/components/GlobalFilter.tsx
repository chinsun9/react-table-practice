import React from 'react';

type Props = {
  filter: string;
  setFilter: (value: string) => void;
};

export default function GlobalFilter({ filter, setFilter }: Props) {
  return (
    <div>
      <span>
        Search:{' '}
        <input
          type="text"
          value={filter || ''}
          onChange={(e) => setFilter(e.target.value)}
        />
      </span>
    </div>
  );
}
