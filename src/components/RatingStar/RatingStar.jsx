import { useMemo, useState } from 'react';
import Button from '../Button';

import { RatingStarIcon } from '../Icons';

export default function RatingStar({
  count,
  rating,
  onRating,
  color = { filled: '', unfilled: '' },
}) {
  const [hoverRating, setHoverRating] = useState(0);

  const getColor = (index) => {
    if (hoverRating >= index) {
      return color.filled;
    } else if (!hoverRating && rating >= index) {
      return color.filled;
    }

    return color.unfilled;
  };

  const ratingStars = useMemo(() => {
    return [...Array(count)].map((_, index) => {
      index += 1;
      return (
        <li key={index}>
          <Button
            icon
            onClick={() => onRating(index)}
            onMouseEnter={() => setHoverRating(index)}
            onMouseLeave={() => setHoverRating(0)}
          >
            <RatingStarIcon className={getColor(index)} />
          </Button>
        </li>
      );
    });
  }, [count, rating, hoverRating]);

  return <ul className="col-span-12 flex gap-2">{ratingStars}</ul>;
}
