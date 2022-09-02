import classNames from 'classnames/bind';
import Link from 'next/link';

import { images } from 'src/constants';
import { formatVndCurrency } from 'src/utils/formatNumber';
import Image from '../Image';
import styles from './ProductItem.module.css';

const mk = classNames.bind(styles);

export default function ProductItem({ data }) {
  // console.log(data);
  return (
    <li>
      <Link href={`/products/${data.slug}`}>
        <a className={mk('root')}>
          <Image
            src={data.images.find((image) => image.type === 'primary').url}
            alt={data.name}
            width="50"
            height="50"
            className={mk('image')}
          />
          <div className={mk('info')}>
            <h4 className={mk('name')}>{data.name}</h4>
            <div className={mk('sub-info')}>
              <span className={mk('price')}>{formatVndCurrency(data.stocks[0].price)}</span>
              <span>*****</span>
            </div>
          </div>
        </a>
      </Link>
    </li>
  );
}
