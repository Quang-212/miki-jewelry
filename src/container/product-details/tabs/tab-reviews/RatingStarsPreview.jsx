import { PassiveRatingStar } from 'src/components/RatingStar';
import { averageRating } from 'src/utils/averageRating';

const TOTAL_STARS = 5;

export default function RatingStarsPreview({ data }) {
  return (
    <div className="col-span-3 flex flex-col gap-4">
      <h5 className="heading-5">Đánh giá sản phẩm</h5>
      <div className="grid grid-cols-12">
        <p className="col-span-3 row-span-2 heading-2 text-primary-2">
          {averageRating(data.rating)}
        </p>
        <ul className="col-span-9 flex gap-1 ml-2">
          <PassiveRatingStar
            count={TOTAL_STARS}
            star={Math.round(averageRating(data.rating))}
            width="14"
            color={{ filled: 'text-active-star', unfilled: 'text-normal-star' }}
          />
        </ul>
        <small className="col-span-9 ml-3 text-neutral-1">
          {data.total ? `${data.total} nhận xét` : ''}
        </small>
      </div>
    </div>
  );
}
