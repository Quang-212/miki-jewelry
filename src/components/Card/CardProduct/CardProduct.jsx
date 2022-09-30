import classNames from 'classnames/bind';
import { toast } from 'react-toastify';
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
      return push(PATH.LOGIN);
    }

    const targetProductQuantity =
      cart.find(
        ({ product: cartProduct, size }) =>
          cartProduct._id === product._id && size === generateProperty(product, 'size'),
      )?.quantity || 0;

    if (1 + targetProductQuantity > generateProperty(product, 'quantity')) {
      return toast('Số lượng vượt quá hiện có, kiểm tra giỏ hàng hoặc chi tiết sản phẩm', {
        type: 'info',
      });
    }

    try {
      const res = await toast.promise(
        addToCart({
          userId: user._id,
          product: product._id,
          size: generateProperty(product, 'size'),
        }),
        {
          pending: {
            render() {
              return 'Đang kết nối';
            },
            icon: '😇',
          },
          success: {
            render({ data }) {
              return data.data.message;
            },
            icon: '😍',
          },
          error: {
            render({ data }) {
              return data.response?.data.message;
            },
            icon: '😵‍💫',
          },
        },
        { autoClose: 4000 },
      );
      setAddToCart(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const { name, images, stocks, discount } = product;
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
      second: 'group-hover:scale-125',
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
      <span className={mk('tag-sale')}>
        <span className="relative text-white">Giảm {discount}%</span>
      </span>
      <CardImage className={classImageWrapper}>
        <Image
          src={primaryImageURL}
          alt={`Ảnh ${name}`}
          width={width}
          height={height}
          objectFit={objectFit}
          className={classImage}
          onClick={onClick}
          {...passProps}
        />
      </CardImage>
      <CardTextWrapper className={classTextWrapper} onClick={onClick}>
        <CardTextTitle
          title={name}
          className="w-[272px] font-primary font-bold text-xl leading-7 text-primary text-center overflow-hidden text-ellipsis whitespace-nowrap"
        >
          {name}
        </CardTextTitle>
        <CardTextPrice className="font-primary font-bold text-xl leading-7 text-primary-2">
          {formatVndCurrency(price, discount)}
        </CardTextPrice>
      </CardTextWrapper>
      <Button primary onClick={handleAddToCart} wrapper="w-[264px]">
        Thêm vào giỏ hàng
      </Button>
    </CardWrapper>
  );
}
