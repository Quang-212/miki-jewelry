import classNames from 'classnames/bind';
import Image from 'next/image';

import { PATH } from 'src/routes/path';
import Button from '../../Button';
import styles from './CardProduct.module.css';

const mk = classNames.bind(styles);

export function CardProduct({
  src,
  alt,
  width,
  height,
  objectFit = 'cover',
  placeholder = 'blur',
  title,
  price,
  wrapper,
  imageWrapper,
  image,
  textWrapper,
  onClick,
  ...passProps
}) {
  const CardWrapper = 'article';
  const CardImage = 'div';
  const CardTextWrapper = 'div';
  const CardTextTitle = 'h5';
  const CardTextPrice = 'span';

  const classWrapper = mk('root', 'group', {
    [wrapper]: wrapper,
  });
  const classImageWrapper = mk('image-wrapper', 'group-hover:drop-shadow-product-card', {
    [imageWrapper]: imageWrapper,
  });
  const classImage = mk('image', 'group-hover:scale-110', {
    [image]: image,
  });
  const classTextWrapper = mk('text-wrapper', {
    [textWrapper]: textWrapper,
  });

  return (
    <CardWrapper className={classWrapper}>
      <CardImage className={classImageWrapper}>
        <Image
          src={src}
          alt={alt ?? 'Product Image'}
          width={width}
          height={height}
          objectFit={objectFit}
          placeholder={placeholder}
          className={classImage}
          onClick={onClick}
        />
      </CardImage>
      <CardTextWrapper className={classTextWrapper} onClick={onClick}>
        <CardTextTitle className="heading-5">{title}</CardTextTitle>
        <CardTextPrice className="heading-5 text-primary-2">{price}đ</CardTextPrice>
      </CardTextWrapper>
      <Button primary internalLink={PATH.products}>
        Thêm vào giỏ hàng
      </Button>
    </CardWrapper>
  );
}
