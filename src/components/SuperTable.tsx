/* eslint-disable react/prop-types */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import {
  CellProps,
  useBlockLayout,
  useFilters,
  useGlobalFilter,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable,
} from 'react-table';
import { useSticky } from 'react-table-sticky';
import MOCK_DATA from './MOCK_DATA.json';
import { COLUMNS } from './columns';
import { Checkbox } from './Checkbox';
import GlobalFilter from './GlobalFilter';
import { Styles } from './TableStyles';

const Main = styled.div`
  padding: 20px;

  h1 {
    margin-bottom: 40px;

    span {
      color: #7c7c7c;
    }
  }

  > p {
    min-height: 21px;
  }
`;

const TableOptions = styled.div`
  margin: 5px;
  display: flex;
  gap: 20px;
  align-items: center;
  margin-bottom: 30px;
  justify-content: space-between;

  .left {
    display: flex;
    align-items: flex-end;
    gap: 20px;
  }

  .right {
    display: flex;
    gap: 20px;
    align-items: center;
    justify-content: center;
  }

  input {
    padding: 10px 15px;
    font-size: medium;
    border: 1px solid black;
    border-radius: 10px;
    outline: none;
    margin-left: 10px;
  }
`;

const PaginationOptionsBottom = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;

  .pageinfo {
    margin: 5px;
    display: flex;
    gap: 20px;
    align-items: center;
    color: #6d717a;
  }

  .pagination {
    display: flex;
    gap: 2px;

    button {
      padding: 10px 20px;
      background-color: transparent;
      border: none;
      border-radius: 5px;
      transition: all 0.3s ease 0s;
      border: 1px solid black;

      :disabled {
        box-shadow: none;
        color: #6d717a;
        border: 1px solid #d1d1d1;
      }
    }
  }
`;

export default function SuperTable() {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => MOCK_DATA, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state,
    gotoPage,
    pageCount,
    setPageSize,
    prepareRow,
    setGlobalFilter,
    setFilter,
    selectedFlatRows,
    rows,
  } = useTable(
    {
      // @ts-ignore
      columns,
      data,
      defaultCanFilter: true,
    },
    useBlockLayout,
    useSticky,
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((hookColumns) => {
        return [
          {
            id: 'selection',
            Header: ({ getToggleAllPageRowsSelectedProps }) => (
              <Checkbox {...getToggleAllPageRowsSelectedProps()} />
            ),
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            Cell: ({ row }: CellProps<any>) => (
              <Checkbox {...row.getToggleRowSelectedProps()} />
            ),
            sticky: 'left',
            disableFilters: true,
            width: 50,
          },
          ...hookColumns,
        ];
      });
    },
  );

  const { pageIndex, pageSize, globalFilter } = state;

  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(rows.length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Main>
      <p> 📝 sort + custom filter + pagination + selection + sticky </p>
      <h1>
        User List <span>({total})</span>
      </h1>

      <TableOptions>
        <div className="left">
          <span className="pagesize">
            Show{' '}
            <select
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
            >
              {[5, 10, 25, 50].map((pageSizeItem) => (
                <option key={pageSizeItem} value={pageSizeItem}>
                  {pageSizeItem}
                </option>
              ))}
            </select>
          </span>

          <select
            name="country"
            onChange={(e) => {
              const { name, value } = e.target;
              setFilter(name, value);
            }}
          >
            <option value="">All country</option>
            {Array.from(new Set(data.map((item) => item.country))).map(
              (value) => {
                return (
                  <option key={value} value={value}>
                    {value}
                  </option>
                );
              },
            )}
          </select>

          <select
            name="age"
            onChange={(e) => {
              const { name, value } = e.target;
              setFilter(name, value);
            }}
          >
            <option value="">All age</option>
            {[20, 30, 40, 50].map((value, idx, origin) => {
              return (
                <option key={value} value={value}>
                  {origin[idx - 1] ? origin[idx - 1] + ' < x ' : ''}
                  {`<= ` + value}
                </option>
              );
            })}
            <option value="over 50">{`50 <`}</option>
          </select>
        </div>

        <div className="right">
          <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
        </div>
      </TableOptions>

      <p>
        {selectedFlatRows.length > 0
          ? selectedFlatRows.length + ' rows selected'
          : ' '}
      </p>

      <div className="table">
        <Styles>
          <div {...getTableProps()} className="table sticky">
            <div className="header">
              {headerGroups.map((headerGroup) => (
                <div {...headerGroup.getHeaderGroupProps()} className="tr">
                  {headerGroup.headers.map((column) => (
                    <div
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      className="th"
                    >
                      <div className="cell">
                        <span> {column.render('Header')}</span>
                        <span className="sorticon">
                          {column.isSorted
                            ? column.isSortedDesc
                              ? ' 🔽'
                              : ' 🔼'
                            : ''}
                        </span>
                        {JSON.stringify(column.filter)}

                        <div>
                          {column.id === 'status'
                            ? column.render('Filter')
                            : null}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div {...getTableBodyProps()} className="body">
              {page.map((row) => {
                prepareRow(row);
                return (
                  <div {...row.getRowProps()} className="tr">
                    {row.cells.map((cell) => (
                      <div {...cell.getCellProps()} className="td">
                        {cell.render('Cell')}
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        </Styles>
      </div>

      <PaginationOptionsBottom>
        <span className="pageinfo">
          Showing{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </span>

        <div className="pagination">
          <button
            type="button"
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
          >
            <b>{'<<'}</b>
          </button>

          {pageOptions
            .filter((value) => value >= pageIndex - 2 && value <= pageIndex + 2)
            .map((pageNumber) => {
              return (
                <button
                  key={pageNumber}
                  type="button"
                  onClick={() => gotoPage(pageNumber)}
                  disabled={pageNumber === pageIndex}
                >
                  {pageNumber + 1}
                </button>
              );
            })}

          <button
            type="button"
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            <b>{'>>'}</b>
          </button>
        </div>
      </PaginationOptionsBottom>
    </Main>
  );
}
