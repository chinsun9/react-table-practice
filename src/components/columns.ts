import { format } from 'date-fns';

export const COLUMNS = [
  {
    Header: 'ID',
    Footer: 'ID',
    accessor: 'id',
    disableFilters: true,
  },
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
  {
    Header: 'E-mail',
    Footer: 'E-mail',
    accessor: 'email',
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
