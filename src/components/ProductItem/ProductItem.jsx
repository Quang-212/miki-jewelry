import classNames from 'classnames/bind';
import Link from 'next/link';

import { formatVndCurrency } from 'src/utils/formatNumber';
import Image from '../Image';
import styles from './ProductItem.module.css';

const mk = classNames.bind(styles);

export default function ProductItem({ data }) {
  const image = data.images.find((image) => image.type === 'primary').url;
  const price = formatVndCurrency(data.stocks[0].price);

  return (
    <li>
      <Link href={`/products/${data.slug}`}>
        <a className={mk('root')}>
          <Image src={image} alt={data.name} width="50" height="50" className={mk('image')} />
          <div className={mk('info')}>
            <h4 className={mk('name')}>
              <strong>{data.name}</strong>
            </h4>
            <div className={mk('sub-info')}>
              <span className={mk('price')}>{price}</span>
              <span>*****</span>
            </div>
          </div>
        </a>
      </Link>
    </li>
  );
}
