import { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { useRecoilState, useRecoilValue } from 'recoil';

import Button from 'src/components/Button';
import { NormalDivider } from 'src/components/Dividers';
import { FavoriteIcon, MinusIcon, PlusIcon, RatingStarIcon } from 'src/components/Icons';
import { addToCart } from 'src/fetching/cart';
import { createFavorite } from 'src/fetching/favorite';
import { useRouter } from 'src/hooks';
import { addToCartState, userState } from 'src/recoils';
import { formatVndCurrency } from 'src/utils/formatNumber';

export default function MainInformation({ product, averageRating }) {
  const {
    _id,
    name,
    discount,
    stocks,
    sold,
    favorite: favoriteServer,
    likedCount: likedCountServer,
  } = product;

  const [sizeChecked, setSizeChecked] = useState(0);
  const [{ quantity, fallback }, setQuantity] = useState({
    quantity: 1,
    fallback: 1,
  });
  const [favorite, setFavorite] = useState(Boolean(favoriteServer));
  const [likedCount, setLikedCount] = useState(likedCountServer);

  const { push } = useRouter();

  const { user, isAuthenticated } = useRecoilValue(userState);

  const [cart, setCart] = useRecoilState(addToCartState);

  const subtractButtonRef = useRef();
  const addButtonRef = useRef();

  const handleClickFavorite = async () => {
    if (!isAuthenticated) {
      return push(PATH.LOGIN);
    }

    try {
      setFavorite((prev) => !prev);
      setLikedCount((prev) => (favorite ? prev - 1 : prev + 1));

      const res = await createFavorite({
        userId: user._id,
        productId: product._id,
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const isOutOfStock = (inputQuantity) => {
    return (
      stocks.find((stock) => stock.size == generateProperty(sizeChecked, 'size')).quantity <
      inputQuantity
    );
  };

  const handleClickSize = (index) => {
    setSizeChecked(index);
  };

  const generateProperty = (sizeChecked, property) => {
    return stocks.find((_, index) => index === sizeChecked)[property];
  };

  const handleTypingInput = (event) => {
    const value = event.target.value;
    const replaceValue = quantity ? value.replace(/\D/g, '') : value.replace(/\D|0/g, '');

    if (event.type === 'change') {
      return setQuantity((prev) => ({
        quantity: replaceValue,
        fallback:
          (isOutOfStock(+replaceValue)
            ? generateProperty(sizeChecked, 'quantity')
            : +replaceValue) || prev.fallback,
      }));
    }

    if (event.key === 'Enter' || event.type === 'blur') {
      if (event.target !== (addButtonRef.current.target || subtractButtonRef.current.target)) {
        setQuantity((prev) =>
          replaceValue && !isOutOfStock(+replaceValue + 1)
            ? { quantity: +replaceValue, fallback: +replaceValue }
            : { ...prev, quantity: prev.fallback },
        );
      }
    }
  };

  const handleAdd = () => {
    if (!isOutOfStock(quantity + 1)) {
      setQuantity(({ quantity, fallback }) => ({
        quantity: quantity ? quantity + 1 : fallback + 1,
        fallback: fallback + 1,
      }));
    }
  };

  const handleSubtract = () => {
    setQuantity(({ quantity, fallback }) => ({
      quantity: quantity ? quantity - 1 : fallback - 1,
      fallback: fallback - 1,
    }));
  };

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      return push(PATH.LOGIN);
    }

    const targetProductQuantity =
      cart.find(
        ({ product, size }) =>
          product._id === _id && size === generateProperty(sizeChecked, 'size'),
      )?.quantity || 0;

    if (fallback + targetProductQuantity > generateProperty(sizeChecked, 'quantity')) {
      return toast('Số lượng quá lớn, kiểm tra giỏ hàng hoặc số lượng còn lại', {
        type: 'info',
      });
    }

    try {
      const res = await toast.promise(
        addToCart({
          userId: user._id,
          product: product._id,
          size: generateProperty(sizeChecked, 'size'),
          quantity: fallback,
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
              console.log(data);
              return data.response?.data.message;
            },
            icon: '😵‍💫',
          },
        },
        { autoClose: 4000 },
      );
      console.log(res);
      setCart(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleBuyNow = () => {
    console.log('buy now');
  };

  return (
    <section className="flex flex-col gap-4 max-w-[539px] max-h-[465px]">
      <h2 className="font-primary font-bold text-32-px leading-10 text-primary">{name}</h2>

      <div className="flex gap-8">
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            <small className="text-neutral-1">4.9</small>
            <ul className="flex ml-2">
              <li>
                <RatingStarIcon width="14" height="14" className="text-active-star" />
              </li>
              <li>
                <RatingStarIcon width="14" height="14" className="text-active-star" />
              </li>
              <li>
                <RatingStarIcon width="14" height="14" className="text-active-star" />
              </li>
              <li>
                <RatingStarIcon width="14" height="14" className="text-active-star" />
              </li>
              <li>
                <RatingStarIcon width="14" height="14" className="text-active-star" />
              </li>
            </ul>
          </div>
          <NormalDivider vertical="border-2 h-3 border-l-[1px] border-neutral-2" />
          <p>{sold} đã bán</p>
        </div>
        {!generateProperty(sizeChecked, 'quantity') ? (
          <span className="ml-8 subtitle-1 text-caption-1">Hết hàng</span>
        ) : generateProperty(sizeChecked, 'quantity') < 10 ? (
          <span className="ml-8 subtitle-1 text-caption-1">
            Sắp hết hàng (Còn {generateProperty(sizeChecked, 'quantity')} sản phẩm)
          </span>
        ) : (
          <span className="ml-8 subtitle-1 text-caption-2">Còn hàng</span>
        )}
      </div>
      {discount ? (
        <>
          <div className="flex items-center gap-4 mt-5">
            <span className="font-primary font-semibold text-2xl leading-8 text-neutral-2 line-through">
              {formatVndCurrency(generateProperty(sizeChecked, 'price'))}
            </span>
            <NormalDivider vertical="border-2 h-5 border-l-[1px] border-neutral-2" />
            <span className="py-1 px-2 rounded-tag bg-discount text-neutral-5">- {discount}%</span>
            <Button
              leftIcon={
                <FavoriteIcon
                  className={favorite ? 'fill-red-500 stroke-red-500' : 'stroke-red-500'}
                />
              }
              onClick={handleClickFavorite}
              wrapper="ml-8"
              title="font-medium"
            >
              Đã thích ({likedCount})
            </Button>
          </div>
          <span className="font-primary font-bold text-5xl leading-58-px text-primary-2">
            {formatVndCurrency(generateProperty(sizeChecked, 'price'), discount)}
          </span>
        </>
      ) : (
        <div>
          <span className="mt-8 mb-4 font-primary font-bold text-5xl leading-58-px text-primary-2">
            {formatVndCurrency(generateProperty(sizeChecked, 'price'))}
          </span>
          <Button
            leftIcon={
              <FavoriteIcon
                className={favorite ? 'fill-red-500 stroke-red-500' : 'stroke-red-500'}
              />
            }
            onClick={handleClickFavorite}
            wrapper="ml-4"
          >
            Đã thích ({likedCount})
          </Button>
        </div>
      )}
      <div className="grid grid-cols-12 grid-rows-2 items-center gap-y-6 mt-4">
        <span className="col-span-4 min-w-[100px]">Kích thước:</span>
        <ul className="col-span-8 flex justify-between gap-6 flex-wrap">
          {stocks.map((stock, index) => (
            <li key={stock._id}>
              <Button
                wrapper={
                  stock.quantity
                    ? index === sizeChecked
                      ? 'flex justify-center items-center w-[42px] h-10 py-2 px-3 border-2 rounded-primary border-primary bg-primary text-neutral-5'
                      : 'flex justify-center items-center w-[42px] h-10 py-2 px-3 border-2 rounded-primary border-primary cursor-pointer'
                    : 'flex justify-center items-center w-[42px] h-10 py-2 px-3 border-2 rounded-primary border-primary bg-neutral-3 text-neutral-5'
                }
                onClick={() => handleClickSize(index)}
                disabled={stock.quantity === 0}
              >
                {stock.size}
              </Button>
            </li>
          ))}
        </ul>

        <div className="col-span-4 flex min-w-[100px]">Số lượng:</div>
        <div className="col-span-4 flex items-center gap-4">
          <Button
            ref={subtractButtonRef}
            icon
            wrapper="p-1 active:bg-primary active:rounded-full"
            onClick={handleSubtract}
            disabled={fallback === 1}
          >
            <MinusIcon className="active:text-white h-6 w-6" />
          </Button>
          <span className="font-primary font-bold text-xl leading-7 text-primary">
            <input
              type="text"
              value={quantity}
              onChange={handleTypingInput}
              onBlur={handleTypingInput}
              onKeyUp={handleTypingInput}
              className="w-10 text-center bg-wrapper outline-none focus-within:border-primary-1 focus-within:rounded-tag focus-within:border-2"
            />
          </span>
          <Button
            ref={addButtonRef}
            icon
            wrapper="active:bg-primary active:rounded-full"
            onClick={handleAdd}
            // disabled={}
          >
            <PlusIcon className="active:text-white w-8 h-8" />
          </Button>
        </div>
        <span className="col-span-4 justify-self-end caption text-neutral-2">
          {generateProperty(sizeChecked, 'quantity')} sản phẩm có sẵn
        </span>
      </div>
      {isOutOfStock(+quantity) && (
        <span className="caption text-caption-1">
          Bạn chỉ có thể mua tối đa {generateProperty(sizeChecked, 'quantity')} sản phẩm!
        </span>
      )}

      <div className="flex justify-between gap-10 mt-4">
        <Button outline onClick={handleAddToCart} wrapper="w-2/4">
          Thêm vào giỏ hàng
        </Button>
        <Button primary onClick={handleBuyNow} wrapper="w-2/4">
          Mua ngay
        </Button>
      </div>
    </section>
  );
}
