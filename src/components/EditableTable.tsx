/**
 * https://react-table.tanstack.com/docs/examples/editable-data
 */
import React, { useEffect, useMemo, useState } from 'react';
import { useTable, usePagination, Row, HeaderGroup } from 'react-table';
import styled from 'styled-components';
import MOCK_DATA from './MOCK_DATA.json';
import { COLUMNS } from './columns';
import { Styles } from './TableStyles';

const EditableTableStyles = styled(Styles)`
  input {
    font-size: 1rem;
    padding: 10px;
    margin: 0;
    border: 0;
    outline: none;
    background-color: transparent;

    :focus {
      background-color: white;
      border-radius: 5px;
      border: 1px solid #333e4c;
    }
  }
`;

type EditableCellProps = {
  value: string;
  row: Row;
  column: HeaderGroup;
  updateMyData: (index: number, id: number, value: string) => void;
};

const EditableCell = ({
  value: initialValue,
  row: { index },
  column: { id },
  updateMyData,
}: EditableCellProps) => {
  const [value, setValue] = useState(initialValue);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onBlur = () => {
    updateMyData(index, +id, value);
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return <input value={value} onChange={onChange} onBlur={onBlur} />;
};

const defaultColumn = {
  Cell: EditableCell,
};

export default function EditableTable() {
  const [skipPageReset, setSkipPageReset] = useState(false);
  const columns = useMemo(() => COLUMNS, []);
  const originData = useMemo(() => MOCK_DATA, []);
  const [data, setData] = useState(originData);

  const updateMyData = (rowIndex: number, columnId: number, value: string) => {
    setSkipPageReset(true);
    setData((old) =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value,
          };
        }
        return row;
      }),
    );
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
  } = useTable(
    {
      // @ts-ignore
      columns,
      data,
      defaultColumn,
      autoResetPage: !skipPageReset,
      updateMyData,
    },
    usePagination,
  );

  useEffect(() => {
    setSkipPageReset(false);
  }, [data]);

  return (
    <EditableTableStyles>
      <p style={{ margin: '5px' }}> 📝 click cell</p>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </EditableTableStyles>
  );
}
