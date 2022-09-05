import classNames from 'classnames/bind';
import Image from 'src/components/Image';
import { images } from 'src/constants';

import styles from './Invoice.module.css';

const mk = classNames.bind(styles);

export default function InvoiceItem() {
  return (
    <div className={mk('invoice-item')}>
      <div className={mk('image-wrapper')}>
        <Image src={images.adminAvatar} alt="" width={56} height={56} className={mk('image')} />
      </div>
      <div className={mk('info')}>
        <h5 className={mk('subtitle-1')}>Lira Earrings</h5>
        <div className="">Kích thước: 16 </div>
        <div className="">Số lượng: 28 </div>
      </div>
      <span className={mk('item-price')}>599.000đ</span>
    </div>
  );
}
