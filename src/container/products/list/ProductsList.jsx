import { toast } from 'react-toastify';
import { useRecoilState, useRecoilValue } from 'recoil';
import { CardProduct } from 'src/components/Card';
import { addToCart } from 'src/fetching/cart';
import { useRouter } from 'src/hooks';
import { addToCartState, userState } from 'src/recoils';
import { PATH } from 'src/routes';
import { formatVndCurrency } from 'src/utils/formatNumber';

export function ProductsList({ products }) {
  const { push } = useRouter();

  const { user, isAuthenticated } = useRecoilValue(userState);

  const [cart, setAddToCart] = useRecoilState(addToCartState);

  const handleClick = (item) => push(`/products/${item.slug}`);

  const generateProperty = ({ stocks }, property) => {
    return stocks.find((_, index) => index === 0)[property];
  };

  const handleAddToCart = async (product) => {
    if (!isAuthenticated) {
      return push(PATH.login);
    }

    const targetProductQuantity =
      cart.find(
        ({ product: cartProduct, size }) =>
          cartProduct._id === product._id && size === generateProperty(product, 'size'),
      )?.quantity || 0;

    if (1 + targetProductQuantity > generateProperty(product, 'quantity')) {
      return toast('Số lượng vượt quá hiện có, check giỏ hàng hoặc chi tiết sản phẩm', {
        type: 'info',
      });
    }

    try {
      const res = await addToCart({
        userId: user._id,
        product: product._id,
        size: generateProperty(product, 'size'),
      });

      setAddToCart(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section>
      <ul className="grid grid-cols-4 gap-4">
        {products?.map((product) => (
          <li key={product.slug}>
            <CardProduct
              src={product.images.find((image) => image.type === 'primary').url}
              alt={product.name}
              width={272}
              height={272}
              title={product.name}
              price={formatVndCurrency(product.stocks[0].price)}
              wrapper="w-[272px]"
              onClick={() => handleClick(product)}
              onAddToCart={() => handleAddToCart(product)}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
