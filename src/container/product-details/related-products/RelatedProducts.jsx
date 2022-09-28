import classNames from 'classnames/bind';

import { CardProduct } from 'src/components/Card';
import Slider from 'src/components/Slider';
import { useRouter } from 'src/hooks';
import { PATH } from 'src/routes';
import styles from './RelatedProducts.module.css';

const mk = classNames.bind(styles);

export default function RelatedProducts({ relatedProducts = [] }) {
  const { push } = useRouter();

  const handleClick = (slug) => push(PATH.PRODUCT_DETAIL(slug));

  return (
    <section className={mk('related-products')}>
      <h2 className={mk('title')}>Có thể bạn cũng thích</h2>
      <Slider>
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
      </Slider>
    </section>
  );
}
