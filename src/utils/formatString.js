export const formatReplaceString = (sourceString) => {
  return sourceString.replace(/[^\wèéòàùì\s]/gi, '');
};

export const formatSearchString = (targetArray) => {
  const normalizedString = (str) =>
    str
      .toLowerCase()
      .trim()
      .normalize('NFD')
      .replace(/ + /g, ' ')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D');
  const searchString = targetArray.reduce((search, item) => {
    search = search.concat([
      item.toLowerCase(),
      normalizedString(item),
      item.toLowerCase().split(' ').join(''),
      normalizedString(item).split(' ').join(''),
    ]);
    return search;
  }, []);
  return searchString.join(' ');
};

export const formatStringTextAvatar = (text) => {
  const textSplit = text.split(' ').filter((item) => item.trim());

  const initials = textSplit[0].charAt(0).toUpperCase() + textSplit[1].charAt(0).toUpperCase();

  return initials;
};
