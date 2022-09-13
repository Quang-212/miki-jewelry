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
  set: ({ get, set }, { currentProduct, cartId, size, type, quantity }) => {
    const prevCart = get(cartState);
    const existedProduct = prevCart.find(({ cartId: cartIdRecoil }) => cartIdRecoil === cartId);

    const calculateQuantity = (type, quantity, prevQuantity) => {
      if (type === 'typing') {
        return quantity;
      }

      if (type === 'addMultiply') {
        return prevQuantity + quantity;
      }
      //* add from cart
      return type === 'subtract' ? prevQuantity - 1 : prevQuantity + 1;
    };

    const updateCart = ({ prevCart, cartId, size, type, quantity }) => {
      return prevCart.map((item) =>
        item.cartId === cartId
          ? {
              ...item,
              quantity:
                type === 'updateSize'
                  ? item.quantity
                  : calculateQuantity(type, quantity, item.quantity),
              size: type === 'updateSize' ? size : item.size,
              cartId: type === 'updateSize' ? `${item.product._id}${size}` : item.cartId,
            }
          : item,
      );
    };

    return set(
      cartState,
      existedProduct
        ? updateCart({ prevCart, cartId, size, type, quantity })
        : [
            ...prevCart,
            {
              product: currentProduct,
              cartId,
              size,
              quantity,
            },
          ],
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

export const deleteCartItemState = selector({
  key: 'deleteCartItem',
  get: ({ get }) => get(cartState),
  set: ({ set, get }, cartId) => {
    const prevCart = get(cartState);

    return set(
      cartState,
      prevCart.filter((item) => item.cartId !== cartId),
    );
  },
});
