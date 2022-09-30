import { useRouter } from 'src/hooks';
import { CardProduct } from 'src/components/Card';

export function ProductsList({ products }) {
  const { push } = useRouter();
  const handleClick = (item) => push(`/products/${item.slug}`);

  return (
    <section>
      <ul className="grid grid-cols-4 gap-y-6 gap-x-4">
        {products?.map((product) => (
          <li key={product.slug}>
            <CardProduct
              product={product}
              width={264}
              height={300}
              // styleWrapper={{ wrapper: 'w-[272px]' }}
              placeholder="blur"
              onClick={() => handleClick(product)}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
