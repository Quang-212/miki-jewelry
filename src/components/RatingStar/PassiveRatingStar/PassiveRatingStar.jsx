import { RatingStarIcon } from 'src/components/Icons';

export default function PassiveRatingStar({
  count,
  star,
  width,
  color = { filled: '', unfilled: '' },
}) {
  return [...Array(count)].map((_, index) => {
    return (
      <li key={index}>
        <RatingStarIcon width={width} className={index < star ? color.filled : color.unfilled} />
      </li>
    );
  });
}
