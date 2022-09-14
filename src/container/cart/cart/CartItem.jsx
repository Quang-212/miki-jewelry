import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import Button from 'src/components/Button';
import { Checkbox } from 'src/components/Checkbox';
import { CloseIcon, MinusIcon, PlusIcon } from 'src/components/Icons';
import Image from 'src/components/Image';
import { Wrapper as PopperWrapper } from 'src/components/Popper';
import { deleteCartItem, updateCart } from 'src/fetching/cart';
import { addToCartState, deleteCartItemState, userState } from 'src/recoils';
import { formatVndCurrency } from 'src/utils/formatNumber';
import styles from './Cart.module.css';

const mk = classNames.bind(styles);

export default function CartItem({ data, orders, onCheck, onCheckSizeChange }) {
  const { product, size, quantity, cartId } = data;

  const [sizeChecked, setSizeChecked] = useState(
    product.stocks.findIndex((stock) => stock.size == size),
  );

  const [stateQuantity, setQuantity] = useState({
    type: null,
    quantity,
    fallback: quantity,
  });

  const { user } = useRecoilValue(userState);

  const [cart, setCart] = useRecoilState(addToCartState);
  const deleteCartItemRecoil = useSetRecoilState(deleteCartItemState);

  const { quantity: inputQuantity, fallback } = stateQuantity;

  useEffect(() => {
    if (stateQuantity.type) {
      updateCart(
        {
          ...(stateQuantity.type === 'typing' && { amount: fallback }),
          size,
        },
        { params: { userId: user._id, quantityType: stateQuantity.type, product: product._id } },
      )
        .then(() => {
          setCart({
            cartId: `${product._id}${size}`,
            size,
            type: stateQuantity.type,
            ...(stateQuantity.type === 'typing' && { quantity: fallback }),
          });
        })
        .catch((error) => console.log(error));
    }
  }, [fallback]);

  const handleClickSize = (index) => setSizeChecked(index);

  const generatePrice = () => {
    return product.stocks.find((stock) => stock.size === size).price * quantity;
  };

  const generateNewSize = (sizeChecked) => {
    return product.stocks.find((_, index) => index === sizeChecked)['size'];
  };

  const isOutOfStock = (inputQuantity) => {
    return product.stocks.find((stock) => stock.size === size).quantity < +inputQuantity;
  };

  const isChosenSize = (size) => {
    return cart.find((item) => item.cartId === `${product._id}${size}` && item.cartId !== cartId);
  };

  const handleTypingInput = (event) => {
    const value = event.target.value;
    const replaceValue = value.replace(/\D|0/g, '');

    if (event.type === 'change') {
      return setQuantity((prev) => ({
        type: 'typing',
        quantity: !isOutOfStock(replaceValue) ? replaceValue : prev.quantity,
        fallback: (!isOutOfStock(replaceValue) && +replaceValue) || prev.fallback,
      }));
    }

    if (event.key === 'Enter' || event.type === 'blur') {
      setQuantity((prev) =>
        replaceValue
          ? { quantity: +replaceValue, fallback: +replaceValue }
          : { ...prev, quantity: prev.fallback },
      );
    }
  };

  const handleAdd = () => {
    if (!isOutOfStock(quantity + 1))
      setQuantity(({ quantity, fallback }) => ({
        type: 'plus',
        quantity: quantity + 1,
        fallback: fallback + 1,
      }));
  };

  const handleSubtract = () => {
    // quantity < 1 => popup confirm => delete
    setQuantity(({ quantity, fallback }) => ({
      type: 'subtract',
      quantity: quantity - 1,
      fallback: fallback - 1,
    }));
  };

  const handleSubmitDistribution = () => {
    updateCart(
      { newSize: generateNewSize(sizeChecked), size },
      { params: { userId: user._id, quantityType: 'updateSize', product: product._id } },
    )
      .then(() => {
        onCheckSizeChange(`${product._id}${size}`, `${product._id}${generateNewSize(sizeChecked)}`);

        setCart({
          cartId: `${product._id}${size}`,
          size: generateNewSize(sizeChecked),
          type: 'updateSize',
        });
      })
      .catch((error) => console.log(error));
  };

  const handleDeleteCartItem = async () => {
    try {
      deleteCartItem({
        params: { userId: user._id, size, product: product._id },
      });

      deleteCartItemRecoil(cartId);
    } catch (error) {
      console.log(error);
    }
  };

  const renderDistribution = (attrs) => {
    return (
      <div className="w-fit" tabIndex="-1" {...attrs}>
        <PopperWrapper className="gap-8 pt-4 pb-6 px-8">
          <span className="text-[#707070]">Kích thước:</span>
          <ul className="flex flex-wrap gap-4">
            {product.stocks.map((stock, index) => {
              const isOutOfStock = stock.quantity === 0;
              return (
                !isOutOfStock && (
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
                      disabled={isOutOfStock || isChosenSize(stock.size)}
                    >
                      {stock.size}
                    </Button>
                  </li>
                )
              );
            })}
          </ul>
          <div className="flex justify-between gap-4">
            <Button text title="subtitle-1">
              Trở lại
            </Button>
            <Button primary onClick={handleSubmitDistribution}>
              Xác nhận
            </Button>
          </div>
        </PopperWrapper>
      </div>
    );
  };

  return (
    <div className={mk('cart-item')}>
      <div>
        <Checkbox
          checked={orders.includes(cartId)}
          onChange={() => onCheck(cartId)}
          className="w-6 h-6"
        />
        <Image
          src={product.images.find((image) => image.type === 'primary').url}
          alt={product.name}
          width={136}
          height={136}
          className={mk('image')}
        />
      </div>
      <div className={mk('col-2')}>
        <h5 className={mk('heading-5')}>{product.name}</h5>
        <div>
          <Tippy
            // visible
            interactive
            placement="bottom-start"
            delay={[200, 400]}
            render={renderDistribution}
          >
            <p className={mk('size')}>
              Phân loại hàng: <br /> Kích thước: {size}
            </p>
          </Tippy>
        </div>
        <div className="flex items-center gap-6">
          <Button
            // ref={subtractButtonRef}
            icon
            wrapper="p-1 active:bg-primary active:rounded-full"
            onClick={handleSubtract}
            // disabled={fallback === 1}
          >
            <MinusIcon className="active:text-white h-6 w-6" />
          </Button>
          <span className="heading-5">
            <input
              type="text"
              value={inputQuantity}
              onChange={handleTypingInput}
              onBlur={handleTypingInput}
              onKeyUp={handleTypingInput}
              className="w-10"
            />
          </span>
          <Button
            // ref={addButtonRef}
            icon
            disabled={isOutOfStock(quantity + 1)}
            wrapper="active:bg-primary active:rounded-full"
            onClick={handleAdd}
          >
            <PlusIcon className="active:text-white w-8 h-8" />
          </Button>
        </div>
      </div>
      <div className={mk('col-3')}>
        <Button icon onClick={handleDeleteCartItem}>
          <CloseIcon />
        </Button>
        <span className={mk('price')}>{formatVndCurrency(generatePrice())}</span>
      </div>
    </div>
  );
}
