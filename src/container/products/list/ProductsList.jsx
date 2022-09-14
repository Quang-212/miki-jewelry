import { useRecoilValue, useSetRecoilState } from 'recoil';
import { CardProduct } from 'src/components/Card';
import { addToCart } from 'src/fetching/cart';
import { useRouter } from 'src/hooks';
import { addToCartState, userState } from 'src/recoils';
import { PATH } from 'src/routes';
import { formatVndCurrency } from 'src/utils/formatNumber';

export function ProductsList({ products }) {
  const { push } = useRouter();

  const { user, isAuthenticated } = useRecoilValue(userState);

  const setAddToCart = useSetRecoilState(addToCartState);

  const handleClick = (item) => push(`/products/${item.slug}`);

  const generateSize = ({ stocks }) => {
    return stocks.find((_, index) => index === 0)['size'];
  };

  const handleAddToCart = async (product) => {
    console.log(product);
    if (!isAuthenticated) {
      return push(PATH.login);
    }

    try {
      const res = await addToCart({
        userId: user._id,
        product: product._id,
        size: generateSize(product),
      });
      console.log(res);

      setAddToCart({
        cartId: `${product._id}${generateSize(product)}`,
        currentProduct: product,
        type: 'plus',
        size: generateSize(product),
        quantity: 1,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section>
      <ul className="flex justify-between flex-wrap gap-10">
        {products?.map((product) => (
          <li key={product.slug}>
            <CardProduct
              src={product.images.find((image) => image.type === 'primary').url}
              alt={product.name}
              width={254}
              height={300}
              title={product.name}
              price={formatVndCurrency(product.stocks[0].price)}
              wrapper="max-w-254-px"
              onClick={() => handleClick(product)}
              onAddToCart={() => handleAddToCart(product)}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
