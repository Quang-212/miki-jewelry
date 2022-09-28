import { ProgressBarRating } from 'src/components/ProgressBarRating';
import { PassiveRatingStar } from 'src/components/RatingStar';

const TOTAL_STARS = 5;

export default function RatingStarsListPreview({ data }) {
  return (
    <ul className="col-span-12 max-w-[242px] mt-2">
      {data.map((rating) => {
        return (
          <li key={rating.star} className="flex justify-between items-center gap-2">
            <ul className="flex gap-1">
              <PassiveRatingStar
                count={TOTAL_STARS}
                star={rating.star}
                width="14"
                color={{ filled: 'text-active-star', unfilled: 'text-normal-star' }}
              />
            </ul>
            <ProgressBarRating done={rating.percent} />
            <small className="text-neutral-1">{rating.count}</small>
          </li>
        );
      })}
    </ul>
  );
}
