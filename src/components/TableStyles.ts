import styled from 'styled-components';

export const Styles = styled.div`
  max-width: 100%;

  .table {
    width: 100%;
    border: 1px solid #ddd;
    font-family: Arial, Helvetica, sans-serif;
    border-collapse: collapse;

    .tr {
      :last-child {
        .td {
          border-bottom: 0;
        }
      }

      &:nth-child(even) {
        .td {
          background-color: #f2f2f2;
        }
      }
    }

    .th,
    .td {
      padding: 8px;
      border-bottom: 1px solid #ddd;
      border-right: 1px solid #ddd;
      background-color: #fff;
      overflow: hidden;

      :last-child {
        border-right: 0;
      }
    }

    &.sticky {
      overflow: scroll;
      .header,
      .footer {
        position: sticky;
        z-index: 1;
        width: fit-content;
      }

      .header {
        top: 0;
        box-shadow: 0px 3px 3px #ccc;
      }

      .footer {
        bottom: 0;
        box-shadow: 0px -3px 3px #ccc;
      }

      .body {
        position: relative;
        z-index: 0;
      }

      [data-sticky-td] {
        position: sticky;
      }

      [data-sticky-last-left-td] {
        box-shadow: 2px 0px 3px #ccc;
      }

      [data-sticky-first-right-td] {
        box-shadow: -2px 0px 3px #ccc;
      }
    }

    .th,
    .footer .tr:last-child .td {
      padding-top: 12px;
      padding-bottom: 12px;
      text-align: center;
      background-color: #4caf50;
      color: white;
    }
  }
`;
