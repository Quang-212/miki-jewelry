import classNames from 'classnames/bind';
import { useRecoilState, useRecoilValue } from 'recoil';

import Image from 'src/components/Image';
import { addToCart } from 'src/fetching/cart';
import { useRouter } from 'src/hooks';
import { addToCartState, userState } from 'src/recoils';
import { PATH } from 'src/routes';
import { formatVndCurrency } from 'src/utils/formatNumber';
import Button from '../../Button';
import styles from './CardProduct.module.css';

const mk = classNames.bind(styles);

export function CardProduct({
  product = {},
  width,
  height,
  objectFit = 'cover',
  placeholder = 'blur',
  styleWrapper = {},
  textWrapper,
  onClick,
  ...passProps
}) {
  const { push } = useRouter();

  const { user, isAuthenticated } = useRecoilValue(userState);

  const [cart, setAddToCart] = useRecoilState(addToCartState);

  const generateProperty = ({ stocks }, property) => {
    return stocks.find((_, index) => index === 0)[property];
  };

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      return push(PATH.login);
    }

    const targetProductQuantity =
      cart.find(
        ({ product: cartProduct, size }) =>
          cartProduct._id === product._id && size === generateProperty(product, 'size'),
      )?.quantity || 0;

    if (1 + targetProductQuantity > generateProperty(product, 'quantity')) {
      return toast('Số lượng vượt quá hiện có, check giỏ hàng hoặc chi tiết sản phẩm', {
        type: 'info',
      });
    }

    try {
      const res = await addToCart({
        userId: user._id,
        product: product._id,
        size: generateProperty(product, 'size'),
      });

      setAddToCart(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const { name, images, stocks } = product;
  const primaryImageURL = images.find((image) => image.type === 'primary').url;
  const price = stocks[0].price;

  const CardWrapper = 'article';
  const CardImage = 'div';
  const CardTextWrapper = 'div';
  const CardTextTitle = 'h5';
  const CardTextPrice = 'span';

  const rename = [
    {
      first: 'root',
      second: 'group',
      className: 'wrapper',
    },
    {
      first: 'image-wrapper',
      second: 'group-hover:drop-shadow-product-card',
      className: 'imageWrapper',
    },
    {
      first: 'image',
      second: 'group-hover:scale-110',
      className: 'image',
    },
  ];
  const uppercaseFirstLetter = (string) => string[0].toUpperCase() + string.slice(1);

  const { classWrapper, classImageWrapper, classImage } = rename.reduce(
    (obj, { first, second, className }) => {
      obj[`class${uppercaseFirstLetter(className)}`] = mk(first, second, {
        [className]: styleWrapper[className],
      });
      return obj;
    },
    {},
  );

  const classTextWrapper = mk('text-wrapper', {
    [textWrapper]: textWrapper,
  });

  return (
    <CardWrapper className={classWrapper}>
      <CardImage className={classImageWrapper}>
        <Image
          src={primaryImageURL}
          alt={`Ảnh ${name}`}
          width={width}
          height={height}
          objectFit={objectFit}
          placeholder={placeholder}
          className={classImage}
          onClick={onClick}
        />
      </CardImage>
      <CardTextWrapper className={classTextWrapper} onClick={onClick}>
        <CardTextTitle className="w-[272px] heading-5 text-center overflow-hidden text-ellipsis whitespace-nowrap">
          {name}
        </CardTextTitle>
        <CardTextPrice className="heading-5 text-primary-2">
          {formatVndCurrency(price)}
        </CardTextPrice>
      </CardTextWrapper>
      <Button primary onClick={handleAddToCart}>
        Thêm vào giỏ hàng
      </Button>
    </CardWrapper>
  );
}
