import { useTable } from 'react-table';
import classNames from 'classnames/bind';
import styles from './BasicTable.module.css';

const mk = classNames.bind(styles);

export default function BasicTable({ columns, data, wrapper }) {
  const Table = 'table';
  const TableHead = 'thead';
  const TableRow = 'tr';
  const TableHeader = 'th';
  const TableBody = 'tbody';
  const TableData = 'td';

  const tableInstance = useTable({ columns, data });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

  const classWrapper = mk('root', {
    [wrapper]: wrapper,
  });

  return (
    <Table {...getTableProps()} className={classWrapper}>
      <TableHead>
        {headerGroups.map((headerGroup) => (
          <TableRow
            {...headerGroup.getHeaderGroupProps()}
            className="border border-neutral-3 text-primary-1"
          >
            {headerGroup.headers.map((column) => (
              <TableHeader
                {...column.getHeaderProps()}
                className="py-2 px-3 border border-neutral-3 "
              >
                {column.render('Header')}
              </TableHeader>
            ))}
          </TableRow>
        ))}
      </TableHead>
      <TableBody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <TableRow {...row.getRowProps()} className="border border-neutral-3">
              {row.cells.map((cell) => (
                <TableData {...cell.getCellProps()} className="py-2 px-3 border border-neutral-3">
                  {cell.render('Cell')}
                </TableData>
              ))}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
