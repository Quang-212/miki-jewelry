import classNames from 'classnames/bind';
import { Fragment, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import Button from 'src/components/Button';
import Dialog from 'src/components/Dialog';
import { NormalDivider } from 'src/components/Dividers';
import { CloseIcon } from 'src/components/Icons';
import { addToCart } from 'src/fetching/cart';
import { useRouter } from 'src/hooks';
import { addToCartState, userState } from 'src/recoils';
import { PATH } from 'src/routes';
import { formatVndCurrency } from 'src/utils/formatNumber';
import styles from './Common.module.css';
import ProductItem from './ProductItem';

const mk = classNames.bind(styles);

const MIN_PRODUCTS_QUANTITY = 2;

export default function OrderItem({ data, index }) {
  const [isViewAll, setIsViewAll] = useState({
    status: false,
    index: null,
  });
  const [isOpen, setIsOpen] = useState(false);
  const { push } = useRouter();
  const { user } = useRecoilValue(userState);

  const [cart, setCart] = useRecoilState(addToCartState);

  const handleViewAll = (index) => {
    setIsViewAll(({ status }) => ({ status: !status, index }));
  };

  const leftProducts = (products) => {
    return products.length - MIN_PRODUCTS_QUANTITY;
  };

  const generateProperty = ({ stocks }, compareKey, compareValue, property) => {
    return stocks.find((item) => item[compareKey] === compareValue)[property];
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
      const isAvailable = generateProperty(item.product, 'size', item.size, 'quantity') > 0;
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
    try {
      const res = await addToCart(
        Object.entries(qwerty)
          .filter(([_, value]) => value.isAddToCart)
          .map(([productId, value]) => ({
            userId: user._id,
            product: productId,
            size: value.size,
          })),
      );
      setCart(res.data);
      if (notEnoughQuantityProductName) {
        return setIsOpen(true);
      }

      push(PATH.CART);
    } catch (error) {
      console.log(error);
    }
  };

  const handleBuyAgainRedirect = () => {
    setIsOpen(false);
    push(PATH.CART);
  };

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
              <p className={mk('order-view', 'subtitle-1')} onClick={() => handleViewAll(index)}>
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
            <Button
              outline
              internalLink={`/account/orders/${data._id}`}
              wrapper={mk('btn-view-detail')}
            >
              Xem chi tiết
            </Button>
          </div>
        </div>
      </div>
      <Dialog isOpen={isOpen} closeModal={() => {}} content="w-[600px] px-12">
        <div className="flex flex-col gap-4">
          <div className="flex justify-end cursor-pointer">
            <CloseIcon onClick={handleBuyAgainRedirect} />
          </div>
          <p className="text-2xl">
            Sản phẩm {notEnoughQuantityProductName} đã hết hàng. Các sản phẩm còn lại đã thêm vào
            giỏ hàng thành công.
          </p>
          <Button primary onClick={handleBuyAgainRedirect} wrapper="w-full mt-12">
            Đồng ý
          </Button>
        </div>
      </Dialog>
    </>
  );
}
