import classNames from 'classnames/bind';

import { NormalDivider } from 'src/components/Dividers';
import { formatVndCurrency } from 'src/utils/formatNumber';
import styles from './Invoice.module.css';
import InvoiceItem from './InvoiceItem';

const mk = classNames.bind(styles);

export default function Invoice({ address: { provinces }, chosenOrder }) {
  const pricePerProduct = (cartItem) => {
    return cartItem.product.stocks.find((stock) => stock.size == cartItem.size).price;
  };

  const totalInvoice = chosenOrder.reduce((total, item) => {
    return (total += pricePerProduct(item) * item.quantity);
  }, 0);

  const generateShippingFee = (provinceCode = 9999) => {
    const FREE_SHIPPING_POINT = 500000;
    const DEFAULT_SHIPPING_FEE = 50000;
    const DOMESTIC_SHIPPING_FEE = 20000;

    switch (provinceCode) {
      case 1: //Hà nội
      case 79: //Sài Gòn
        return totalInvoice >= FREE_SHIPPING_POINT ? 0 : DOMESTIC_SHIPPING_FEE;
      default:
        return DEFAULT_SHIPPING_FEE;
    }
  };

  const discountByCoupon = 200000;

  const totalPrice = formatVndCurrency(
    totalInvoice - (discountByCoupon + generateShippingFee(provinces)),
  );

  return (
    <section className={mk('invoice')}>
      <ul className={mk('invoice-list')}>
        {chosenOrder.map((order) => (
          <li key={order._id}>
            <InvoiceItem data={order} />
          </li>
        ))}
      </ul>
      <NormalDivider wrapper={mk('divider-1')} />
      <div className={mk('detail')}>
        <ul className={mk('title-list')}>
          <li>Giá sản phẩm</li>
          <li>Phí giao hàng</li>
          <li>Giảm giá</li>
        </ul>
        <ul className={mk('prices')}>
          <li className="heading-5">{formatVndCurrency(totalInvoice)}</li>
          <li className="heading-5">{formatVndCurrency(generateShippingFee(provinces))}</li>
          <li className="heading-5">{formatVndCurrency(discountByCoupon)}</li>
        </ul>
      </div>
      <NormalDivider wrapper={mk('divider-2')} />
      <div className={mk('total')}>
        <h5 className="heading-5">Tổng</h5>
        <span className="heading-5">{totalPrice}</span>
      </div>
    </section>
  );
}
