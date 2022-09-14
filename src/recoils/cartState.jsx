import { atom, selector } from 'recoil';

import persistAtom from 'src/utils/recoilPersist';

export const cartState = atom({
  key: 'cart',
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const addToCartState = selector({
  key: 'addToCart',
  get: ({ get }) => get(cartState),
  set: ({ get, set }, { data: currentCartItem }) => {
    const prevCart = get(cartState);

    const existedProduct = prevCart.find((cartItem) => cartItem._id === currentCartItem._id);

    const updateCart = (currentCartItem) => {
      return prevCart.map((item) => (item._id === currentCartItem._id ? currentCartItem : item));
    };

    return set(
      cartState,
      existedProduct ? updateCart(currentCartItem) : [...prevCart, currentCartItem],
    );
  },
});

export const deleteCartItemState = selector({
  key: 'deleteCartItem',
  get: ({ get }) => get(cartState),
  set: ({ set, get }, cartId) => {
    const prevCart = get(cartState);

    return set(
      cartState,
      prevCart.filter((item) => item._id !== cartId),
    );
  },
});

export const totalCartState = selector({
  key: 'totalCart',
  get: ({ get }) => {
    const cart = get(cartState);

    const pricePerProduct = (cartItem) => {
      return cartItem.product.stocks.find((stock) => stock.size == cartItem.size).price;
    };

    return cart.reduce((total, item) => {
      return (total += pricePerProduct(item) * item.quantity);
    }, 0);
  },
});
