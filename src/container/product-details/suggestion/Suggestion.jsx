import { CardProduct } from 'src/components/Card';
import { useRouter } from 'src/hooks';
import { PATH } from 'src/routes';

export function Suggestion({ relatedProducts = [] }) {
  const { push } = useRouter();
  const handleClick = (slug) => push(PATH.PRODUCT_DETAIL(slug));

  return (
    <section className="flex flex-col gap-72-px">
      <div className="relative z-10 flex justify-between">
        <h2 className="font-primary font-bold text-32-px leading-10 text-primary">
          Có thể bạn cũng thích
        </h2>
      </div>
      <ul className="flex justify-between">
        {relatedProducts.map((product, index) => (
          <li key={index}>
            <CardProduct
              product={product}
              width={254}
              height={307}
              placeholder="blur"
              styleWrapper={{ wrapper: 'max-w-254-px' }}
              onClick={() => handleClick(product.slug)}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
