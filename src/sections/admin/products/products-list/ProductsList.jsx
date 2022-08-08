import Button from 'src/components/Button';
import { PATH } from 'src/routes';
import useSWR from 'swr';

export function ProductsList() {
  const { data, error, mutate, isValidating } = useSWR(`/api/admin/products?_limit=15&_page=25`);
  console.log(data?.data);

  return (
    <section>
      <h2>{data?.data.productList[4].priceNew}</h2>
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
