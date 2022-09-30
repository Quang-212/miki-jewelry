import classNames from 'classnames/bind';
import { isEmpty } from 'lodash';
import qs from 'qs';

import { useRouter } from 'next/router';
import { Fragment } from 'react';
import Button from 'src/components/Button';
import { CardProduct } from 'src/components/Card';
import Slider from 'src/components/Slider';
import { PATH } from 'src/routes';
import styles from './FeaturedProducts.module.css';

const mk = classNames.bind(styles);

export function FeaturedProducts({ products }) {
  const { push, query } = useRouter();

  const featuredProducts = isEmpty(products) ? [] : products;

  const handleClick = (slug) => push(PATH.PRODUCT_DETAIL(slug));

  const handleClickSeeAll = () => {
    const queryString = qs.stringify({
      ...query,
      sortBy: 'sold',
      order: -1,
    });
    return push(`${PATH.PRODUCTS}?${queryString}`);
  };

  return (
    <section className={mk('featured-products', 'container')}>
      <div className={mk('row-1')}>
        <h2 className="font-primary font-bold text-32-px leading-10 text-primary">
          Sản phẩm nổi bật
        </h2>
        <Button primary onClick={handleClickSeeAll}>
          Xem tất cả
        </Button>
      </div>
      <Slider>
        {featuredProducts.map((product, index) => (
          <Fragment key={index}>
            <CardProduct
              product={product}
              width={264}
              height={300}
              placeholder="blur"
              // styleWrapper={{ wrapper: 'max-w-254-px' }}
              onClick={() => handleClick(product.slug)}
            />
          </Fragment>
        ))}
      </Slider>
    </section>
  );
}
