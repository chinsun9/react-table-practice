import React from 'react';

type Props = {
  column: {
    filterValue: string;
    setFilter: (value: string) => void;
  };
};

export default function ColumnFilter({ column }: Props) {
  const { filterValue, setFilter } = column;
  return (
    <div>
      <span>
        Search:{' '}
        <input
          type="text"
          value={filterValue || ''}
          onChange={(e) => setFilter(e.target.value)}
        />
      </span>
    </div>
  );
}
