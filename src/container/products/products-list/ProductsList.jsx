import { CardProduct } from 'src/components/Card';
import { LoadingRotatingLines } from 'src/components/Loadings';
import { useProducts } from 'src/hooks/useProducts';

const formatVndCurrency = (number) =>
  new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(number);

export function ProductsListSection({ initProducts, page, limit }) {
  const { productsState, isLoading, isError } = useProducts(
    {
      page,
      limit,
      select: {
        _id: 1,
        name: 1,
        images: 1,
        stocks: 1,
      },
    },
    { fallbackData: initProducts },
  );

  const products = productsState?.productList;
  // console.log(products);

  if (isError) return <h2>{isError}</h2>;
  if (isLoading) return <LoadingRotatingLines className="absolute z-10 left-2/4 top-3/4" />;

  return (
    <section className="container mt-10 flex flex-col gap-8">
      <ul className="flex justify-between flex-wrap gap-10">
        {products?.map((product) => (
          <li key={product._id}>
            <CardProduct
              src={product.images.find((image) => image.type === 'primary').url}
              alt={product.name}
              width={254}
              height={300}
              title={product.name}
              price={formatVndCurrency(product.stocks[0].price)}
              wrapper="max-w-254-px"
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
