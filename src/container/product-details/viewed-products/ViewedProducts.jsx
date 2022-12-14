import classNames from 'classnames/bind';

import { CardProduct } from 'src/components/Card';
import { useRouter } from 'src/hooks';
import { PATH } from 'src/routes';
import styles from './ViewProducts.module.css';

const mk = classNames.bind(styles);

export default function ViewProducts({}) {
  const { push } = useRouter();

  const handleClick = (slug) => push(PATH.PRODUCT_DETAIL(slug));

  return (
    <section className={mk('related-products')}>
      <h2 className={mk('title')}>Sản phẩm đã xem</h2>
      {/* <ul className={mk('products-list')}>
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
      </ul> */}
    </section>
  );
}
