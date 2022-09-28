import { RatingStarIcon } from 'src/components/Icons';

export default function PassiveRatingStar({
  count,
  star,
  width,
  color = { filled: '', unfilled: '' },
}) {
  const getColor = (index) => {
    switch (star) {
      case 5:
        return color.filled;
      case 4:
        return index === 5 ? color.unfilled : color.filled;
      case 3:
        return index === 4 || index === 5 ? color.unfilled : color.filled;
      case 2:
        return index === 3 || index === 4 || index === 5 ? color.unfilled : color.filled;
      default:
        return index === 2 || index === 3 || index === 4 || index === 5
          ? color.unfilled
          : color.filled;
    }
  };
  return [...Array(count)].map((_, index) => {
    index += 1;
    return (
      <li key={index}>
        <RatingStarIcon width={width} className={getColor(index)} />
      </li>
    );
  });
}
