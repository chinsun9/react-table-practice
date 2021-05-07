import './table.css';
import React, { useMemo } from 'react';
import MOCK_DATA from './MOCK_DATA.json';
import { COLUMNS } from './columns';
import { useBlockLayout, useTable } from 'react-table';
import { useSticky } from 'react-table-sticky';
import { Styles } from './TableStyles';
import styled from 'styled-components';

export default function StickyTable() {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => MOCK_DATA, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      // @ts-ignore
      columns,
      data,
    },
    useBlockLayout,
    useSticky,
  );

  const firstPageRows = rows.slice(0, 20);

  const StickyTableWrapper = styled.div`
    width: 100%;
    display: flex;
  `;

  return (
    <StickyTableWrapper>
      <Styles>
        <div
          {...getTableProps()}
          className="table sticky"
          style={{ height: '400px' }}
        >
          <div className="header">
            {headerGroups.map((headerGroup) => (
              <div {...headerGroup.getHeaderGroupProps()} className="tr">
                {headerGroup.headers.map((column) => (
                  <div {...column.getHeaderProps()} className="th">
                    {column.render('Header')}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div {...getTableBodyProps()} className="body">
            {firstPageRows.map((row) => {
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
          <div className="footer">
            {footerGroups.map((footerGroup) => (
              <div {...footerGroup.getHeaderGroupProps()} className="tr">
                {footerGroup.headers.map((column) => (
                  <div {...column.getHeaderProps()} className="td">
                    {column.render('Footer')}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </Styles>
    </StickyTableWrapper>
  );
}
