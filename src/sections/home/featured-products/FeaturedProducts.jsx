import classNames from 'classnames/bind';
import { useRouter } from 'next/router';

import Button from 'src/components/Button';
import { CardProduct } from 'src/components/Card';
import { images } from 'src/constants';
import { PATH } from 'src/routes/path';
import styles from './FeaturedProducts.module.css';

const mk = classNames.bind(styles);

export function FeaturedProductsSection() {
  const featuredProducts = [
    {
      image: images.homeFeaturedProduct,
      title: 'Lira Earings',
      price: '355.000',
    },
    {
      image: images.homeFeaturedProduct,
      title: 'Lira Earings',
      price: '355.000',
    },
    {
      image: images.homeFeaturedProduct,
      title: 'Lira Earings',
      price: '355.000',
    },
    {
      image: images.homeFeaturedProduct,
      title: 'Lira Earings',
      price: '355.000',
    },
  ];

  const { push } = useRouter();

  const handleClick = () => push(PATH.products);

  return (
    <section className={mk('featured-products', 'container')}>
      <div className={mk('row-1')}>
        <h2 className="heading-2">Sản phẩm nổi bật</h2>
        <Button primary internalLink={PATH.products}>
          Xem tất cả
        </Button>
      </div>
      <ul className="flex justify-between">
        {featuredProducts.map((product, index) => (
          <li key={index}>
            <CardProduct
              src={product.image}
              alt={product.title}
              width={254}
              height={307}
              title={product.title}
              price={product.price}
              onClick={handleClick}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
