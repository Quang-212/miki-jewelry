import { ProgressBarRating } from 'src/components/ProgressBarRating';
import { PassiveRatingStar } from 'src/components/RatingStar';

const TOTAL_STARS = 5;

export default function RatingStarsListPreview({ data }) {
  const generateRatingStars = (ratingStar) => {
    let star = 5;
    switch (ratingStar) {
      case 5:
        star = 5;
        break;
      case 4:
        star = 4;
        break;
      case 3:
        star = 3;
        break;
      case 2:
        star = 2;
        break;
      default:
        star = 1;
        break;
    }
    return star;
  };

  return (
    <ul className="col-span-12 max-w-[242px] mt-2">
      {data.map((rating) => {
        return (
          <li key={rating.star} className="flex justify-between items-center gap-2">
            <ul className="flex gap-1">
              <PassiveRatingStar
                count={TOTAL_STARS}
                star={generateRatingStars(rating.star)}
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
