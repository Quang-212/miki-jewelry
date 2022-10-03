import classNames from 'classnames/bind';

import Image from 'src/components/Image';
import { useRouter } from 'src/hooks';
import { PATH } from 'src/routes';
import { formatVndCurrency } from 'src/utils/formatNumber';
import styles from './Common.module.css';

const mk = classNames.bind(styles);

export default function ProductItem({ data }) {
  const { push } = useRouter();

  const primaryImageURL = (images) => images.find((image) => image.type === 'primary').url;

  const generatePrice = (product) => {
    return (
      product.product.stocks.find((stock) => stock.size === product.size).price * product.quantity
    );
  };

  const handleGoToDetail = () => push(PATH.PRODUCT_DETAIL(data.product.slug));

  return (
    <div className={mk('product-item')}>
      <div onClick={handleGoToDetail} className={mk('product-image')}>
        <Image
          src={primaryImageURL(data.product.images)}
          alt={`Ảnh ${data.product.name}`}
          width={100}
          height={100}
        />
      </div>
      <h5 onClick={handleGoToDetail} className={mk('product-name')}>
        {data.product.name}
      </h5>
      <span className={mk('product-price')}>{formatVndCurrency(generatePrice(data))}</span>
      <p className={mk('product-description')}>Kích thước: {data.size}</p>
      <p className={mk('product-description')}>Số lượng: {data.quantity}</p>
    </div>
  );
}
