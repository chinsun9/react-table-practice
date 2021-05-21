import { format } from 'date-fns';
import { Row } from 'react-table';

export const COLUMNS = [
  {
    Header: 'ID',
    Footer: 'ID',
    accessor: 'id',
    disableFilters: true,
    sticky: 'left',
  },
  {
    Header: 'First Name',
    Footer: 'First Name',
    accessor: 'first_name',
    sticky: 'left',
  },
  {
    Header: 'Last Name',
    Footer: 'Last Name',
    accessor: 'last_name',
    sticky: 'left',
  },
  {
    Header: 'Date of Birth',
    Footer: 'Date of Birth',
    accessor: 'date_of_birth',
    Cell: ({ value }: { value: string }) => {
      return format(new Date(value), 'yyyy/MM/dd');
    },
  },
  {
    Header: 'Country',
    Footer: 'Country',
    accessor: 'country',
  },
  {
    Header: 'Phone',
    Footer: 'Phone',
    accessor: 'phone',
  },
  {
    Header: 'E-mail',
    Footer: 'E-mail',
    accessor: 'email',
  },
  {
    Header: 'Age',
    Footer: 'Age',
    accessor: 'age',
    filter: (
      rows: Array<Row>,
      columnIds: Array<number>,
      filterValue: string,
    ) => {
      const id = columnIds[0];

      if (!filterValue) {
        return rows;
      }

      if (filterValue === 'over 50') {
        return rows.filter((row) => {
          const rowValue = row.values[id];
          return rowValue > 50;
        });
      }

      return rows.filter((row) => {
        const rowValue = row.values[id];
        return (
          rowValue <= filterValue &&
          (+filterValue === 10 ? true : rowValue > +filterValue - 10)
        );
      });
    },
  },
];

export const GROUPED_COLUMNS = [
  {
    Header: 'ID',
    Footer: 'ID',
    accessor: 'id',
  },
  {
    Header: 'Name',
    Footer: 'Name',
    columns: [
      {
        Header: 'First Name',
        Footer: 'First Name',
        accessor: 'first_name',
      },
      {
        Header: 'Last Name',
        Footer: 'Last Name',
        accessor: 'last_name',
      },
    ],
  },
  {
    Header: 'Info',
    Footer: 'Info',
    columns: [
      {
        Header: 'E-mail',
        Footer: 'E-mail',
        accessor: 'email',
      },
      {
        Header: 'Date of Birth',
        Footer: 'Date of Birth',
        accessor: 'date_of_birth',
      },
      {
        Header: 'Age',
        Footer: 'Age',
        accessor: 'age',
      },
      {
        Header: 'Country',
        Footer: 'Country',
        accessor: 'country',
      },
      {
        Header: 'Phone',
        Footer: 'Phone',
        accessor: 'phone',
      },
    ],
  },
];
