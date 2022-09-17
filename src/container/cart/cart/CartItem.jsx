import Tippy from '@tippyjs/react';
import HeadlessTippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useRecoilState, useSetRecoilState } from 'recoil';
import 'tippy.js/dist/tippy.css';

import Button from 'src/components/Button';
import { Checkbox } from 'src/components/Checkbox';
import { CloseIcon, MinusIcon, PlusIcon } from 'src/components/Icons';
import Image from 'src/components/Image';
import { deleteCartItem, updateCart } from 'src/fetching/cart';
import { useRouter } from 'src/hooks';
import { addToCartState, deleteCartItemState } from 'src/recoils';
import { formatVndCurrency } from 'src/utils/formatNumber';
import styles from './Cart.module.css';
import Distribution from './Distribution';
import ModalDelete from './ModalDelete';
import ModalQuantity from './ModalQuantity';

const mk = classNames.bind(styles);

export default function CartItem({ data, orders, onCheck }) {
  const { product, size, quantity, _id } = data;

  const { push } = useRouter();

  const [sizeChecked, setSizeChecked] = useState(
    product.stocks.findIndex((stock) => stock.size == size),
  );

  const [confirm, setConfirm] = useState({
    delete: false,
    quantity: false,
  });

  const [stateQuantity, setQuantity] = useState({
    type: null,
    quantity,
    fallback: quantity,
  });

  const [cart, setCart] = useRecoilState(addToCartState);
  const deleteCartItemRecoil = useSetRecoilState(deleteCartItemState);

  const { quantity: inputQuantity, fallback } = stateQuantity;

  useEffect(() => {
    if (stateQuantity.type) {
      updateCart(
        {
          ...(stateQuantity.type === 'typing' && { amount: fallback }),
        },
        { params: { id: _id, quantityType: stateQuantity.type, product: product._id } },
      )
        .then((res) => {
          setCart(res.data);
        })
        .catch((error) => {
          if (error.response?.data?.code === 400) {
            return toast(error.response.data.message, { type: 'warning' });
          }
          console.log(error);
        });
    }
  }, [fallback]);

  const handleClickSize = (index) => setSizeChecked(index);

  const generatePrice = () => {
    return product.stocks.find((stock) => stock.size === size).price * quantity;
  };

  const generateNewSize = (sizeChecked) => {
    return product.stocks.find((_, index) => index === sizeChecked)['size'];
  };
  const generateAvailableQuantity = (sizeChecked) => {
    return product.stocks.find((_, index) => index === sizeChecked)['quantity'];
  };
  const isOutOfStock = (inputQuantity) => {
    return product.stocks.find((stock) => stock.size === size).quantity < +inputQuantity;
  };

  const isChosenSize = (size) => {
    return cart.find((item) => item.product._id === product._id && item.size === size);
  };

  useEffect(() => {
    if (inputQuantity && isOutOfStock(inputQuantity)) {
      toast('Số lượng không được vượt quá tồn kho', { type: 'info' });
    }
  }, [inputQuantity]);

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
    if (!isOutOfStock(quantity + 1)) {
      setQuantity(({ quantity, fallback }) => ({
        type: 'plus',
        quantity: quantity + 1,
        fallback: fallback + 1,
      }));
    } else {
      setConfirm((prev) => ({ ...prev, quantity: true }));
    }
  };

  const handleSubtract = () => {
    if (fallback > 1) {
      setQuantity(({ quantity, fallback }) => ({
        type: 'subtract',
        quantity: quantity - 1,
        fallback: fallback - 1,
      }));
    } else {
      setConfirm((prev) => ({ ...prev, delete: true }));
    }
  };

  const handleSubmitDistribution = () => {
    updateCart(
      { newSize: generateNewSize(sizeChecked) },
      { params: { quantityType: 'updateSize', product: product._id } },
    )
      .then((res) => {
        setCart(res.data);
      })
      .catch((error) => {
        if (error.response?.data?.code === 400) {
          return toast(error.response.data.message, { type: 'warning' });
        }
        console.log(error);
      });
  };

  const handleDeleteCartItem = async () => {
    try {
      deleteCartItem({
        params: { id: _id },
      });

      deleteCartItemRecoil(_id);
    } catch (error) {
      console.log(error);
    }
  };

  const renderDistribution = (attrs) => {
    return (
      <Distribution
        attrs={attrs}
        product={product}
        handleClickSize={handleClickSize}
        sizeChecked={sizeChecked}
        isChosenSize={isChosenSize}
        handleSubmitDistribution={handleSubmitDistribution}
      />
    );
  };

  const handleGoToDetail = () => push(`/products/${product.slug}`);

  return (
    <div className={mk('cart-item')}>
      <div>
        <Checkbox
          checked={orders.includes(_id)}
          onChange={() => onCheck(_id)}
          className="w-6 h-6"
        />
        <Image
          src={product.images.find((image) => image.type === 'primary').url}
          alt={product.name}
          width={136}
          height={136}
          className={mk('image')}
          onClick={handleGoToDetail}
        />
      </div>
      <div className={mk('col-2')}>
        <h5 className={mk('heading-5 cursor-pointer')} onClick={handleGoToDetail}>
          {product.name}
        </h5>
        <div>
          <HeadlessTippy
            // visible
            interactive
            placement="bottom-start"
            delay={[200, 400]}
            render={renderDistribution}
          >
            <p className={mk('size')}>
              Phân loại hàng: <br /> Kích thước: {size}
            </p>
          </HeadlessTippy>
        </div>
        <div className="flex justify-center items-center gap-4">
          <Button
            // ref={subtractButtonRef}
            icon
            wrapper="active:bg-primary active:rounded-full"
            onClick={handleSubtract}
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
              className="w-10 text-center"
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
        <Tippy content={<span>Xóa sản phẩm</span>}>
          <Button icon onClick={handleDeleteCartItem}>
            <CloseIcon />
          </Button>
        </Tippy>
        <span className={mk('price')}>{formatVndCurrency(generatePrice())}</span>
      </div>
      <ModalQuantity
        fallback={fallback}
        availableQuantity={generateAvailableQuantity(sizeChecked)}
        confirm={confirm}
        setConfirm={setConfirm}
        isOutOfStock={isOutOfStock}
      />
      <ModalDelete
        fallback={fallback}
        confirm={confirm}
        productName={product.name}
        setConfirm={setConfirm}
        handleDeleteCartItem={handleDeleteCartItem}
      />
    </div>
  );
}
