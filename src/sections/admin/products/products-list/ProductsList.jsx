import { useTable } from 'react-table';
import { useEffect, useMemo, useState } from 'react';

import Button from 'src/components/Button';
import { useProducts } from 'src/hooks/useProducts';
import { PATH } from 'src/routes';
import { LoadingRotatingLines } from 'src/components/Loadings';

export function ProductsList() {
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(5);

  const { products: products1, isLoading, isError } = useProducts(count);

  useEffect(() => {
    products1 && setProducts(products1);
  }, [products1]);

  const productsData = useMemo(() => [...products], [products]);
  const productsColumn = useMemo(
    () =>
      products[0]
        ? Object.keys(products[0])
            .filter((key) => key !== 'size')
            .map((key) => {
              return { Header: key, accessor: key };
            })
        : [],
    [products],
  );

  const tableInstance = useTable({
    columns: productsColumn,
    data: productsData,
  });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

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
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} className="border border-green-500">
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps} className="p-2 border border-green-500">
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
                  <td {...cell.getCellProps()} className="p-5 border border-green-500">
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}
