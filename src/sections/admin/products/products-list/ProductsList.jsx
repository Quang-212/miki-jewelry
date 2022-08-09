import Button from 'src/components/Button';
import { useProducts } from 'src/hooks/useProducts';
import { PATH } from 'src/routes';
import useSWR from 'swr';

import { LoadingRotatingLines } from 'src/components/Loadings';

export function ProductsList() {
  const { products, isLoading, isError } = useProducts();

  if (isError) return <h2>{isError}</h2>;

  if (isLoading) return <LoadingRotatingLines />;

  return (
    <section>
      <ul>
        {products.map((product) => (
          <li key={product._id}>{product.name}</li>
        ))}
      </ul>
      <div className="flex justify-between">
        <div className="flex flex-col">
          <span>Admin/Products</span>
          <h2 className="heading-2">Products List</h2>
        </div>
        <Button primary internalLink={PATH.createProduct}>
          New Product
        </Button>
      </div>
      <div></div>
    </section>
  );
}
