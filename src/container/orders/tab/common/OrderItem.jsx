import { Fragment, useState } from 'react';
import classNames from 'classnames/bind';
import { useRecoilState, useRecoilValue } from 'recoil';

import Button from 'src/components/Button';
import { NormalDivider } from 'src/components/Dividers';
import ProductItem from './ProductItem';
import styles from './Common.module.css';
import { addToCartState, userState } from 'src/recoils';
import { addToCart } from 'src/fetching/cart';
import Dialog from 'src/components/Dialog';
import { CloseIcon } from 'src/components/icons';
import { formatVndCurrency } from 'src/utils/formatNumber';

const mk = classNames.bind(styles);

const MIN_PRODUCTS_QUANTITY = 2;

export default function OrderItem({ data, index }) {
  const [isViewAll, setIsViewAll] = useState({
    status: false,
    index: null,
  });

  const [isOpen, setIsOpen] = useState(false);

  const { user } = useRecoilValue(userState);

  const [cart, setCart] = useRecoilState(addToCartState);

  const handleViewAll = (index) => {
    setIsViewAll(({ status }) => ({ status: !status, index }));
  };

  const leftProducts = (products) => {
    return products.length - MIN_PRODUCTS_QUANTITY;
  };

  const generateProperty = ({ stocks }, property) => {
    return stocks.find((_, index) => index === 0)[property];
  };

  const qwerty = data.products.reduce((result, item) => {
    const targetProduct = cart.find(
      (cartItem) => cartItem.product._id === item.product._id && cartItem.size === item.size,
    );

    if (targetProduct) {
      result[targetProduct.product._id] = {
        size: item.size,
        quantity: targetProduct.quantity,
        isAddToCart: false,
        reason: 'existedCart',
      };
    } else {
      const isAvailable = generateProperty(item.product, 'quantity') > 0;
      result[item.product._id] = {
        size: item.size,
        quantity: 0,
        isAddToCart: isAvailable,
        reason: isAvailable ? 'okay' : 'notEnoughQuantity',
        ...(!isAvailable && { productName: item.product.name }),
      };
    }
    return result;
  }, {});

  const notEnoughQuantityProductName = Object.values(qwerty)
    .reduce((acc, item) => {
      if (!item.isAddToCart && item.reason === 'notEnoughQuantity') {
        acc.push(item.productName);
      }
      return acc;
    }, [])
    .join(', ');

  const handleBuyAgain = async () => {
    console.log(
      Object.entries(qwerty)
        .filter(([_, value]) => value.isAddToCart)
        .map(([productId, value]) => ({
          userId: user._id,
          product: productId,
          size: value.size,
        })),
    );

    // try {
    //   const res = await addToCart([
    //     {
    //       userId: user._id,
    //       product: product._id,
    //       size: generateProperty(product, 'size'),
    //     },
    //   ]);

    //   // setAddToCart(res.data);
    // } catch (error) {
    //   console.log(error);
    // }

    if (notEnoughQuantityProductName) {
      setIsOpen(true);
    }
  };

  const handleCloseModal = () => setIsOpen(false);

  return (
    <>
      <div className={mk('order-item', 'container')}>
        <h5 className={mk('order-name')}>Mã đơn hàng: {data._id}</h5>
        {data.products
          .slice(
            0,
            isViewAll.status && isViewAll.index === index
              ? data.products.length
              : MIN_PRODUCTS_QUANTITY,
          )
          .map((product) => (
            <Fragment key={product._id}>
              <ProductItem data={product} />
              <NormalDivider wrapper=" border-primary-5" />
            </Fragment>
          ))}
        <div className="flex justify-end">
          <div className={mk('order-footer')}>
            {data.products.length > MIN_PRODUCTS_QUANTITY && (
              <p className={mk('order-view')} onClick={() => handleViewAll(index)}>
                {!isViewAll.status
                  ? `Xem thêm ${leftProducts(data.products)} sản phẩm`
                  : `Ẩn bớt ${leftProducts(data.products)} sản phẩm`}
              </p>
            )}
            <p className={mk('order-total')}>Tổng tiền:</p>
            <span className={mk('order-price')}>{formatVndCurrency(data.total)}</span>
            <Button outline onClick={handleBuyAgain} wrapper={mk('btn-buy-again')}>
              Mua lại
            </Button>
            <Button outline internalLink={`/products`} wrapper={mk('btn-view-detail')}>
              Xem chi tiết
            </Button>
          </div>
        </div>
      </div>
      <Dialog isOpen={isOpen} closeModal={handleCloseModal} content="w-[600px] px-12">
        <div className="flex flex-col gap-4">
          <div className="flex justify-end cursor-pointer">
            <CloseIcon onClick={handleCloseModal} />
          </div>
          <p className="text-2xl">
            Sản phẩm {notEnoughQuantityProductName} đã hết hàng. Các sản phẩm còn lại đã thêm vào
            giỏ hàng thành công.
          </p>
          <Button primary onClick={handleBuyAgain} wrapper="w-full mt-12">
            Đồng ý
          </Button>
        </div>
      </Dialog>
    </>
  );
}
