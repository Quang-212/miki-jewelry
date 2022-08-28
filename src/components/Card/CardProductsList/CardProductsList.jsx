import classNames from 'classnames/bind';

import Image from 'src/components/Image';
import { PATH } from 'src/routes';
import Button from '../../Button';
import { CardProduct } from '../CardProduct';
// import styles from './CardProduct.module.css';

// const mk = classNames.bind(styles);

export default function CardProductsList({
  // src,
  // alt,
  width,
  height,
  objectFit = 'cover',
  placeholder = 'blur',
  productsList,
  title,
  price,
  wrapper,
  imageWrapper,
  image,
  textWrapper,
  handleClick,
  ...passProps
}) {
  const CardListWrapper = 'ul';
  const CardListItem = 'li';
  console.log(productsList);
  // const classWrapper = mk('root', 'group', {
  //   [wrapper]: wrapper,
  // });
  // const classImageWrapper = mk('image-wrapper', 'group-hover:drop-shadow-product-card', {
  //   [imageWrapper]: imageWrapper,
  // });
  // const classImage = mk('image', 'group-hover:scale-110', {
  //   [image]: image,
  // });
  // const classTextWrapper = mk('text-wrapper', {
  //   [textWrapper]: textWrapper,
  // });

  return (
    <CardListWrapper className="flex justify-between flex-wrap gap-10">
      {productsList.map((product, index) => (
        <CardListItem key={index}>
          <CardProduct
            src={product.images.find((image) => image.type === 'primary')}
            alt={product.name}
            width={width}
            height={height}
            title={product.name}
            price={product.stocks[0].price}
            wrapper="max-w-254-px"
            onClick={handleClick}
          />
        </CardListItem>
      ))}
    </CardListWrapper>
  );
}
