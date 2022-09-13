import { atom, selector } from 'recoil';

import persistAtom from 'src/utils/recoilPersist';

export const cartState = atom({
  key: 'cart',
  default: [],
  effects_UNSTABLE: [persistAtom],
});

// export const addToCartState = selector({
//   key: 'addToCart',
//   get: ({ get }) => get(cartState),
//   set: ({ set, get }, newProduct) => {
//     const prevCart = get(cartState);
//     const existedProduct = prevCart.find((product) => product._id === newProduct._id);

//     return set(
//       cartState,
//       existedProduct
//         ? prevCart.map((product) =>
//             product._id === newProduct._id
//               ? { ...product, quantity: product.quantity + 1 }
//               : product,
//           )
//         : [...prevCart, { product: newProduct, quantity: 1 }],
//     );
//   },
// });

// export const updateCartState = selector({
//   key: 'updateCart',
//   get: ({ get }) => get(cartState),
//   set: ({ set, get }, currentProduct, type, quantity) => {
//     const prevCart = get(cartState);

//     return set(
//       cartState,
//       prevCart.map((product) =>
//         product._id === currentProduct._id
//           ? { ...product, quantity: type === 'subtract' ? product.quantity - 1 : quantity }
//           : product,
//       ),
//     );
//   },
// });

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
              quantity: calculateQuantity(type, quantity, item.quantity),
              size: type === 'updateSize' ? size : item.size,
              cartId: type === 'updateSize' ? `${item.product._id}${size}` : item.cartId,
            }
          : item,
      );
    };

    console.log('prevCart ', prevCart);
    console.log('existedProduct ', existedProduct);

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

    return cart.length
      ? cart.reduce((total, item) => {
          return total + item.price * item.quantity;
        }, 0)
      : 0;
  },
});
