export function averageRating(rating = []) {
  const total = rating.reduce((total, item) => {
    return (total += item.count);
  }, 0);

  return (
    rating
      .reduce((avg, item) => {
        return (avg += (item.count * item.star) / total);
      }, 0)
      .toFixed(1) || 0
  );
}
