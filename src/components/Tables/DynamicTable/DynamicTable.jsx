import { Icon } from '@iconify/react';
import { usePagination, useRowSelect, useTable } from 'react-table';
import List from 'src/components/List';
import ListIconButton from 'src/components/ListIconButton';
import ListItemButton from 'src/components/ListItemButton';
import Popover from 'src/components/Popover';

import { isEven } from 'src/utils/isEven';
import Button from '../../Button';
import { Checkbox } from '../../Checkbox';
import { MenuVerticalIcon } from '../../Icons';

export default function DynamicTable({
  columns,
  pagination: { pageSize: _pageSize, pageCount: _pageCount, page: pageIndex },
  products,
  onPageChange,
  handleEdit,
  handleDelete,
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
          <Checkbox id="all" {...getToggleAllRowsSelectedProps()} />
        ),
        Cell: ({ row }) => <Checkbox {...row.getToggleRowSelectedProps()} />,
      },
      {
        id: 'order',
        Header: 'No',
        Cell: ({ row, state }) => state.pageIndex * state.pageSize + 1 + Number(row.id),
      },
      ...columns,
      {
        id: 'actions',
        Cell: ({ row }) => (
          <Popover
            renderContent={
              <List className="bg-white p-2 rounded-md flex flex-col gap-2">
                <ListItemButton className="mt-0 mr-2" onClick={() => handleEdit(row.original)}>
                  <ListIconButton>
                    <Icon icon="ci:edit" />
                  </ListIconButton>
                  <span>Edit</span>
                </ListItemButton>
                <ListItemButton
                  className="mt-0 mr-2"
                  onClick={() => {
                    handleDelete(row.original._id);
                  }}
                >
                  <ListIconButton>
                    <Icon icon="ci:edit" />
                  </ListIconButton>
                  <span>Delete</span>
                </ListItemButton>
              </List>
            }
          >
            <div className="px-4">
              <Button className=" hover:bg-gray-300 rounded-full p-2 hover:transition-all hover:scale-110">
                <MenuVerticalIcon />
              </Button>
            </div>
          </Popover>
        ),
      },
    ]);
  };

  const tableInstance = useTable(
    {
      columns,
      data: products,
      initialState: { pageIndex, pageSize: _pageSize },
      manualPagination: true,
      pageCount: _pageCount,
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
    state: { pageSize },
  } = tableInstance;

  return (
    <>
      <Button primary onClick={() => handleDelete(selectedFlatRows.map((row) => row.original._id))}>
        Delete many
      </Button>
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
        <Button
          icon
          outline
          onClick={() => {
            onPageChange((prev) => ({ ...prev, page: 0 }));
            gotoPage(0);
          }}
          disabled={!canPreviousPage}
        >
          {'<<'}
        </Button>
        <Button
          outline
          onClick={() => {
            onPageChange((prev) => ({ ...prev, page: prev.page - 1 }));

            previousPage();
          }}
          disabled={!canPreviousPage}
        >
          Previous
        </Button>
        <Button
          outline
          onClick={() => {
            onPageChange((prev) => ({ ...prev, page: prev.page + 1 }));
            nextPage();
          }}
          disabled={!canNextPage}
        >
          Next
        </Button>
        <Button
          icon
          outline
          onClick={() => {
            onPageChange((prev) => ({ ...prev, page: pageCount - 1 }));
            gotoPage(pageCount - 1);
          }}
          disabled={!canNextPage}
        >
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
              onPageChange((prev) => ({ ...prev, page: pageNumber }));
              gotoPage(pageNumber);
            }}
            style={{ width: '50px' }}
          />
        </span>
        <select
          value={pageSize}
          onChange={(event) => {
            const pageSize = +event.target.value;
            onPageChange((prev) => ({ ...prev, pageSize }));
            setPageSize(pageSize);
          }}
        >
          {[5, 10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </Pagination>
    </>
  );
}
