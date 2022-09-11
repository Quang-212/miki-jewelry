export const getLocalStorage = (key) => {
  if (typeof window !== 'undefined') {
    const result = JSON.parse(localStorage.getItem(key)) ?? null;

    return result;
  }
};

export const setLocalStorage = (key, value) => {
  return localStorage.setItem(key, JSON.stringify(value));
};
