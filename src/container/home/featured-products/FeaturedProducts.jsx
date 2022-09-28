import classNames from 'classnames/bind';
import { isEmpty } from 'lodash';

import { useRouter } from 'next/router';
import Button from 'src/components/Button';
import { CardProduct } from 'src/components/Card';
import Slider from 'src/components/Slider';
import { PATH } from 'src/routes';
import styles from './FeaturedProducts.module.css';

const mk = classNames.bind(styles);

export function FeaturedProducts({ products }) {
  const { push } = useRouter();

  const featuredProducts = isEmpty(products) ? [] : products;

  const handleClick = (slug) => push(PATH.PRODUCT_DETAIL(slug));

  return (
    <section className={mk('featured-products', 'container')}>
      <div className={mk('row-1')}>
        <h2 className="font-primary font-bold text-32-px leading-10 text-primary">
          Sản phẩm nổi bật
        </h2>
        <Button primary internalLink={PATH.products}>
          Xem tất cả
        </Button>
      </div>
      <Slider>
        {featuredProducts.map((product, index) => (
          <div key={index}>
            <CardProduct
              product={product}
              width={254}
              height={307}
              placeholder="blur"
              styleWrapper={{ wrapper: 'max-w-254-px' }}
              onClick={() => handleClick(product.slug)}
            />
          </div>
        ))}
      </Slider>
    </section>
  );
}
