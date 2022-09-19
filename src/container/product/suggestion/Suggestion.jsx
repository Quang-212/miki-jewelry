import { CardProduct } from 'src/components/Card';

export function Suggestion({ relatedProducts = [] }) {
  const handleClick = (slug) => push(PATH.PRODUCT_DETAIL(slug));

  return (
    <section className="flex flex-col gap-72-px">
      <div className="relative z-10 flex justify-between">
        <h2 className="heading-2">Có thể bạn cũng thích</h2>
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
