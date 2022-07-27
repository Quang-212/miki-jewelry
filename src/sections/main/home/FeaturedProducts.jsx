import Image from 'next/image';

import Button from 'src/components/Button';
import { images } from 'src/constants';
import { PATH } from 'src/routes/path';

export function FeaturedProductsSection() {
  const featuredProducts = [
    {
      image: images.homeFeaturedProduct,
      title: 'Lira Earings',
      price: '355.000đ',
    },
    {
      image: images.homeFeaturedProduct,
      title: 'Lira Earings',
      price: '355.000đ',
    },
    {
      image: images.homeFeaturedProduct,
      title: 'Lira Earings',
      price: '355.000đ',
    },
    {
      image: images.homeFeaturedProduct,
      title: 'Lira Earings',
      price: '355.000đ',
    },
  ];

  return (
    <section className="flex flex-col gap-72-px mt-120-px container">
      <div className="relative z-10 flex justify-between">
        <h2 className="heading-2">Sản phẩm nổi bật</h2>
        <Button primary internalLink="/products">
          Xem tất cả
        </Button>
      </div>
      <ul className="flex justify-between">
        {featuredProducts.map((product, index) => (
          <li key={index} className="flex flex-col items-center gap-6-px">
            <Image
              src={product.image}
              alt={product.title}
              width={254}
              height={300}
              objectFit="cover"
              placeholder="blur"
              className="rounded-primary"
            />
            <h5 className="mt-18-px heading-5">{product.title}</h5>
            <span className="heading-5 text-primary-2">{product.price}</span>
            <Button primary internalLink={PATH.products} className="mt-10-px">
              Thêm vào giỏ hàng
            </Button>
          </li>
        ))}
      </ul>
    </section>
  );
}
