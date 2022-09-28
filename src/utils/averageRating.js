export function averageRating(rating = []) {
  const total = rating.reduce((total, item) => {
    return (total += item.count);
  }, 0);
  const result = rating.reduce((avg, item) => {
    return (avg += (item.count * item.star) / total);
  }, 0);
  return result ? result.toFixed(1) : '5.0';
}
