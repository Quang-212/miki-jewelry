import classNames from 'classnames/bind';
import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import Tippy from '@tippyjs/react/headless';

import Button from 'src/components/Button';
import { CloseIcon, MinusIcon, PlusIcon } from 'src/components/Icons';
import Image from 'src/components/Image';
import { images } from 'src/constants';
import { addToCartState } from 'src/recoils';
import { formatVndCurrency } from 'src/utils/formatNumber';
import styles from './Cart.module.css';
import { Wrapper as PopperWrapper } from 'src/components/Popper';

const mk = classNames.bind(styles);

export default function CartItem({ data }) {
  const [sizeChecked, setSizeChecked] = useState(0);

  // const [{ quantity, fallback }, setQuantity] = useState({
  //   quantity,
  //   fallback: 1,
  // });

  const { product, size, quantity } = data;

  const [cart, setCart] = useRecoilState(addToCartState);

  console.log(data);

  const generateProperty = (sizeChecked, property) => {
    return product.stocks.find((_, index) => index === sizeChecked)[property];
  };

  const generatePrice = () => {
    return product.stocks.find((stock) => stock.size === size).price * quantity;
  };

  const isOutOfStock = (inputQuantity) => {
    return product.stocks.find((stock) => stock.size === size).quantity <= inputQuantity;
  };

  const handleClickSize = (index) => {
    console.log(index);
    setSizeChecked(index);
  };

  const handleTypingInput = (event) => {
    const value = event.target.value;
    const replaceValue = value.replace(/\D|0/g, '');

    if (event.type === 'change') {
      return setQuantity((prev) => ({
        quantity1: replaceValue,
        fallback: +replaceValue || prev.fallback,
      }));
    }

    if (event.key === 'Enter' || event.type === 'blur') {
      setQuantity((prev) =>
        replaceValue
          ? { quantity1: +replaceValue, fallback: +replaceValue }
          : { ...prev, quantity1: prev.fallback },
      );
    }
  };

  const handleAdd = () => {
    if (!isOutOfStock(quantity))
      setCart({
        cartId: `${product._id}${size}`,
        size,
        type: 'plus',
      });
  };

  const handleSubtract = () => {
    setCart({
      cartId: `${product._id}${size}`,
      size,
      type: 'subtract',
    });
  };

  const handleSubmitDistribution = () => {
    console.log('handleSubmitDistribution');
    setCart({
      cartId: `${product._id}${size}`,
      size: generateProperty(sizeChecked, 'size'),
      type: 'updateSize',
    });
  };

  return (
    <div className={mk('cart-item')}>
      <div>
        <Image
          src={images.adminAvatar}
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
            // offset={[-122, 16]}
            render={(attrs) => (
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
                              disabled={isOutOfStock}
                            >
                              {stock.size}
                            </Button>
                          </li>
                        )
                      );
                    })}
                  </ul>
                  <div className="flex justify-between gap-4">
                    <Button text>Trở lại</Button>
                    <Button primary onClick={handleSubmitDistribution}>
                      Xác nhận
                    </Button>
                  </div>
                </PopperWrapper>
              </div>
            )}
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
          >
            <MinusIcon className="active:text-white h-6 w-6" />
          </Button>
          <span className="heading-5">
            <input
              type="text"
              value={quantity}
              onChange={handleTypingInput}
              onBlur={handleTypingInput}
              onKeyUp={handleTypingInput}
              className="w-10"
            />
          </span>
          <Button
            // ref={addButtonRef}
            icon
            wrapper="active:bg-primary active:rounded-full"
            onClick={handleAdd}
          >
            <PlusIcon className="active:text-white w-8 h-8" />
          </Button>
        </div>
      </div>
      <div className={mk('col-3')}>
        <Button icon>
          <CloseIcon />
        </Button>
        <span className={mk('price')}>{formatVndCurrency(generatePrice())}</span>
      </div>
    </div>
  );
}
