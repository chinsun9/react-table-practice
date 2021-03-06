import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import StickyTable from './components/StickyTable';
import ColumnHiding from './components/ColumnHiding';
import ColumnOrder from './components/ColumnOrder';
import FilteringTable from './components/FilteringTable';
import PaginationTable from './components/PaginationTable';
import RowSelection from './components/RowSelection';
import BasicTable from './components/BasicTable';
import SortingTable from './components/SortingTable';
import Sidebar from './components/Sidebar';
import styled from 'styled-components';
import EditableTable from './components/EditableTable';
import SuperTable from './components/SuperTable';

const LayoutRoot = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr;
  min-height: 100vh;

  & > div:nth-child(2) {
    width: calc(100vw - 270px);
  }
`;

function App() {
  return (
    <LayoutRoot>
      <Sidebar />
      <Switch>
        <Route path="/StickyTable" component={StickyTable} />
        <Route path="/ColumnHiding" component={ColumnHiding} />
        <Route path="/ColumnOrder" component={ColumnOrder} />
        <Route path="/FilteringTable" component={FilteringTable} />
        <Route path="/PaginationTable" component={PaginationTable} />
        <Route path="/RowSelection" component={RowSelection} />
        <Route path="/BasicTable" component={BasicTable} />
        <Route path="/SortingTable" component={SortingTable} />
        <Route path="/EditableTable" component={EditableTable} />
        <Route path="/All" component={SuperTable} />
        <Redirect path="*" to="/All" />
      </Switch>
    </LayoutRoot>
  );
}

export default App;
