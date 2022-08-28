import classNames from 'classnames/bind';
import Link from 'next/link';
import { images } from 'src/constants';
import Image from '../Image';
import styles from './ProductItem.module.css';

const mk = classNames.bind(styles);

export default function ProductItem({ data }) {
  return (
    <Link href="/products">
      <a className={mk('root')}>
        <Image src={images.homeAbout} alt="hello" width="50" height="50" className={mk('image')} />
        <div className={mk('info')}>
          <h4 className={mk('name')}>Nhan con cua</h4>
          <div className={mk('sub-info')}>
            <span className={mk('price')}>1.200.000đ</span>
            <span>*****</span>
          </div>
        </div>
      </a>
    </Link>
  );
}
