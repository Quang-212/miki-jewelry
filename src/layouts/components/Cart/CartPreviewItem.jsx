import Tippy from '@tippyjs/react';
import classNames from 'classnames/bind';
import { useSetRecoilState } from 'recoil';
import 'tippy.js/dist/tippy.css';

import Button from 'src/components/Button';
import { CloseIcon } from 'src/components/Icons';
import Image from 'src/components/Image';
import { deleteCartItem } from 'src/fetching/cart';
import { useRouter } from 'src/hooks';
import { deleteCartItemState } from 'src/recoils';
import { PATH } from 'src/routes';
import { formatVndCurrency } from 'src/utils/formatNumber';
import styles from './Cart.module.css';

const mk = classNames.bind(styles);

export default function CartPreviewItem({ data }) {
  const { _id, product, size, quantity } = data;

  const deleteCartItemRecoil = useSetRecoilState(deleteCartItemState);

  const { push } = useRouter();

  const generatePrice = () => {
    return product.stocks.find((stock) => stock.size === size).price * quantity;
  };

  const price = formatVndCurrency(generatePrice());

  const handleDelete = async () => {
    try {
      deleteCartItem({
        params: { id: _id },
      });

      deleteCartItemRecoil(_id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoToDetail = () => push(PATH.PRODUCT_DETAIL(product.slug));

  return (
    <div className={mk('cart-review-item')}>
      <div className={mk('cart-item-image')} onClick={handleGoToDetail}>
        <Image
          src={product.images.find((image) => image.type === 'primary').url}
          alt={product.name}
          width={90}
          height={90}
          className="rounded-primary"
        />
      </div>
      <h5 className={mk('cart-item-name')} onClick={handleGoToDetail}>
        {product.name}
      </h5>
      <Tippy content={<span>Xóa sản phẩm</span>}>
        <Button icon onClick={handleDelete} wrapper={mk('btn-delete')}>
          <CloseIcon />
        </Button>
      </Tippy>
      <p className={mk('cart-item-size')}>Kích thước {size}</p>
      <p className={mk('cart-item-quantity')}>{quantity}</p>
      <span className={mk('cart-item-price')}>{price}</span>
    </div>
  );
}
