import { useEffect } from 'react';
import { usePagination, useRowSelect, useTable } from 'react-table';

import Button from '../Button';
import { Checkbox } from '../Checkbox';

export default function Table({
  columns,
  data,
  onPageChange,
  pageState: { limit: _pageSize, pageCount: controlledPageCount, pageIndex },
}) {
  const Table = 'table';
  const TableHead = 'thead';
  const TableRow = 'tr';
  const TableHeader = 'th';
  const TableBody = 'tbody';
  const TableData = 'td';
  const Pagination = 'div';

  const tableHooks = (hooks) => {
    hooks.visibleColumns.push((columns) => [
      {
        id: 'selection',
        Header: ({ getToggleAllRowsSelectedProps }) => (
          <Checkbox {...getToggleAllRowsSelectedProps()} />
        ),
        Cell: ({ row }) => <Checkbox {...row.getToggleRowSelectedProps()} />,
      },
      ...columns,
      {
        id: 'edit',
        Header: 'Edit',
        Cell: ({ row }) => (
          <Button primary onClick={() => alert(`Edit ${row.values._id}`)}>
            Edit
          </Button>
        ),
      },
      {
        id: 'delete',
        Header: 'Delete',
        Cell: ({ row }) => (
          <Button primary onClick={() => alert(`Delete ${row.values._id}`)}>
            Delete
          </Button>
        ),
      },
    ]);
  };

  const isEven = (element) => element % 2 === 0;
  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: { pageIndex, pageSize: _pageSize },
      manualPagination: true,
      pageCount: controlledPageCount,
    },
    usePagination,
    useRowSelect,
    tableHooks,
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
    page,
    previousPage,
    nextPage,
    canPreviousPage,
    canNextPage,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
    state: { pageIndex: _pageIndex, pageSize },
  } = tableInstance;

  useEffect(() => {
    onPageChange((prev) => ({
      ...prev,
      pageIndex: _pageIndex,
      limit: pageSize,
    }));
  }, [_pageIndex, pageSize]);
  return (
    <>
      <Table {...getTableProps()} className="table-fixed text-center text-base text-gray-900">
        <TableHead className="p-2">
          {headerGroups.map((headerGroup, index) => (
            <TableRow
              key={index}
              {...headerGroup.getHeaderGroupProps()}
              className="border border-green-500"
            >
              {headerGroup.headers.map((column, index) => (
                <TableHeader
                  key={index}
                  {...column.getHeaderProps()}
                  className="p-2 border border-green-500"
                >
                  {column.render('Header')}
                </TableHeader>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          {page.map((row, index) => {
            prepareRow(row);
            return (
              <TableRow
                {...row.getRowProps()}
                className={isEven(index) ? 'bg-green-400 bg-opacity-20' : ''}
              >
                {row.cells.map((cell) => (
                  <TableData {...cell.getCellProps()} className="border border-green-500">
                    {cell.render('Cell')}
                  </TableData>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <Pagination>
        <Button icon outline onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </Button>
        <Button outline onClick={() => previousPage()} disabled={!canPreviousPage}>
          Previous
        </Button>
        <Button outline onClick={() => nextPage()} disabled={!canNextPage}>
          Next
        </Button>
        <Button icon outline onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </Button>
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </span>
        <span>
          | Go to page:
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(event) => {
              const pageNumber = event.target.value ? Number(event.target.value) - 1 : 0;
              gotoPage(pageNumber);
            }}
            style={{ width: '50px' }}
          />
        </span>
        <select value={pageSize} onChange={(event) => setPageSize(+event.target.value)}>
          {[5, 10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </Pagination>
      {/* <pre>
        <code>
          {JSON.stringify(
            {
              selectedFlatRows: selectedFlatRows.map((row) => row.original),
            },
            null,
            2,
          )}
        </code>
      </pre> */}
    </>
  );
}
