import classNames from 'classnames/bind';

import Image from 'src/components/Image';
import { formatVndCurrency } from 'src/utils/formatNumber';

import styles from './Invoice.module.css';

const mk = classNames.bind(styles);

export default function InvoiceItem({ data }) {
  const { product, size, quantity } = data;

  const generatePrice = () => {
    return product.stocks.find((stock) => stock.size === size).price * quantity;
  };
  const cartItemPrice = formatVndCurrency(generatePrice());

  return (
    <div className={mk('invoice-item')}>
      <div className={mk('image-wrapper')}>
        <Image
          src={product.images.find((image) => image.type === 'primary').url}
          alt={product.name}
          width={56}
          height={56}
          className={mk('image')}
        />
      </div>
      <div className={mk('info')}>
        <h5 className={mk('subtitle-1')}>{product.name}</h5>
        <p>Kích thước: {size}</p>
        <p>Số lượng: {quantity} </p>
      </div>
      <span className={mk('item-price')}>{cartItemPrice}</span>
    </div>
  );
}
