import { useRowSelect, useTable } from 'react-table';
import { useEffect, useMemo, useState } from 'react';

import Button from 'src/components/Button';
import { useProducts } from 'src/hooks/useProducts';
import { PATH } from 'src/routes';
import { LoadingRotatingLines } from 'src/components/Loadings';
import { COLUMNS_PRODUCTS } from 'src/components/Table';
import { Checkbox } from 'src/components/Checkbox';

export function ProductsList() {
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(1);

  const {
    products: _products,
    isLoading,
    isError,
  } = useProducts({
    limit: count,
    select: {
      slug: 0,
      __v: 0,
    },
  });

  useEffect(() => {
    _products && setProducts(_products);
  }, [_products]);

  const productsData = useMemo(() => [...products], [products]);

  const productsColumn = useMemo(() => COLUMNS_PRODUCTS, []);

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
    ]);
  };

  const tableInstance = useTable(
    {
      columns: productsColumn,
      data: productsData,
    },
    useRowSelect,
    tableHooks,
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, selectedFlatRows } =
    tableInstance;

  //! DUMA NHỚ RETURN CUỐI CÙNG !!!
  if (isError) return <h2>{isError}</h2>;
  if (isLoading) return <LoadingRotatingLines />;

  return (
    <section>
      {/* <ul>
        {products.map((product) => (
          <li key={product._id}>{product.name}</li>
        ))}
      </ul> */}
      {/* <div className="flex justify-between">
        <div className="flex flex-col">
          <span>Admin/Products</span>
          <h2 className="heading-2">Products List</h2>
        </div>
        <Button primary internalLink={PATH.createProduct}>
          New Product
        </Button>
      </div>
      <div></div> */}
      <button onClick={() => setCount((prev) => prev + 1)}>Count</button>
      <table {...getTableProps()} className="table-fixed text-base text-gray-900">
        <thead className="p-2">
          {headerGroups.map((headerGroup, index) => (
            <tr
              key={index}
              {...headerGroup.getHeaderGroupProps()}
              className="border border-green-500"
            >
              {headerGroup.headers.map((column, index) => (
                <th
                  key={index}
                  {...column.getHeaderProps()}
                  className="p-2 border border-green-500"
                >
                  {/* {console.log(column)} */}
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className="border border-green-500">
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()} className="border border-green-500">
                    {console.log(cell.column.id)}
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <pre>
        <code>
          {JSON.stringify(
            {
              selectedFlatRows: selectedFlatRows.map((row) => row.original),
            },
            null,
            2,
          )}
        </code>
      </pre>
    </section>
  );
}
