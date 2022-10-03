import { CardProduct } from 'src/components/Card';
import { useRouter } from 'src/hooks';
import { PATH } from 'src/routes';

export function ProductsList({ products }) {
  const { push } = useRouter();
  const handleClick = (item) => push(PATH.PRODUCT_DETAIL(item.slug));

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
