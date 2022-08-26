import { CardProduct } from 'src/components/Card';
import { LoadingRotatingLines } from 'src/components/Loadings';
import { useProducts } from 'src/hooks/useProducts';
import { formatVndCurrency } from 'src/utils/formatNumber';

export function ProductsList({ initProducts, page, limit }) {
  // const { productsState, isLoading, isError } = useProducts(
  //   {
  //     page,
  //     limit,
  //     select: {
  //       _id: 1,
  //       name: 1,
  //       images: 1,
  //       stocks: 1,
  //     },
  //   },
  //   { fallbackData: initProducts },
  // );

  // const products = productsState?.productList;
  // console.log(products);

  // if (isError) return <h2>{isError}</h2>;
  // if (isLoading) return <LoadingRotatingLines className="absolute z-10 left-2/4 top-3/4" />;

  return (
    <section>
      <ul className="flex justify-between flex-wrap gap-10">
        {initProducts?.map((product) => (
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
