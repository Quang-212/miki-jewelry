import { CardProduct } from 'src/components/Card';
import { useRouter } from 'src/hooks';
import { formatVndCurrency } from 'src/utils/formatNumber';

export function ProductsList({ products }) {
  const { push } = useRouter();

  const handleClick = (item) => push(`/products/${item.slug}`);

  return (
    <section>
      <ul className="flex justify-between flex-wrap gap-10">
        {products?.map((product) => (
          <li key={product.slug}>
            <CardProduct
              src={product.images.find((image) => image.type === 'primary').url}
              alt={product.name}
              width={254}
              height={300}
              title={product.name}
              price={formatVndCurrency(product.stocks[0].price)}
              wrapper="max-w-254-px"
              onClick={() => handleClick(product)}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
