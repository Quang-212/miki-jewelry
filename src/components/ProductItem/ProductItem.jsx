import classNames from 'classnames/bind';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getStableFeedbackProperties } from 'src/fetching/feedback';
import { averageRating } from 'src/utils/averageRating';

import { formatVndCurrency } from 'src/utils/formatNumber';
import Image from '../Image';
import { PassiveRatingStar } from '../RatingStar';
import styles from './ProductItem.module.css';

const mk = classNames.bind(styles);

const TOTAL_STARS = 5;

export default function ProductItem({ data }) {
  const { _id, images, stocks, discount } = data;

  const image = images.find((image) => image.type === 'primary').url;
  const price = formatVndCurrency(stocks[0].price, discount);

  const [reviews, setReviews] = useState({});

  useEffect(() => {
    if (_id) {
      getStableFeedbackProperties({ productId: _id })
        .then(({ data: feedbackProperties }) => {
          setReviews((prev) => ({ ...prev, ...feedbackProperties.data }));
        })
        .catch((error) => console.log(error));
    }
  }, [_id]);

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
              <ul className="flex ml-2">
                <PassiveRatingStar
                  count={TOTAL_STARS}
                  star={Math.round(averageRating(reviews.rating))}
                  width="12"
                  color={{ filled: 'text-active-star', unfilled: 'text-normal-star' }}
                />
              </ul>
            </div>
          </div>
        </a>
      </Link>
    </li>
  );
}
