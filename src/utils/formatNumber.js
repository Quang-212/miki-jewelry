export const formatVndCurrency = (amount, discount = 0) => {
  return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(
    amount - (amount * discount) / 100,
  );
};

export const formatLocaleNumber = (number) => new Intl.NumberFormat('de-DE').format(number);
