const formatPrice = (x, character = '.') => {
  x = String(x);
  return x == '' || x == null
    ? ''
    : x
        .toString()
        .replace(/[.]/g, '')
        .replace(/\B(?=(\d{3})+(?!\d))/g, character);
};

export {formatPrice};
