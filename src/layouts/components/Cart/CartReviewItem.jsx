import { useSetRecoilState } from 'recoil';
import Button from 'src/components/Button';
import { CloseIcon } from 'src/components/Icons';
import Image from 'src/components/Image';
import { deleteCartItem } from 'src/fetching/cart';
import { useRouter } from 'src/hooks';
import { deleteCartItemState } from 'src/recoils';
import { formatVndCurrency } from 'src/utils/formatNumber';

export default function CartReviewItem({ data }) {
  const { _id, product, size, quantity } = data;

  const deleteCartItemRecoil = useSetRecoilState(deleteCartItemState);

  const { push } = useRouter();

  const generatePrice = () => {
    return product.stocks.find((stock) => stock.size === size).price * quantity;
  };

  const pricePerProduct = formatVndCurrency(generatePrice());

  const handleDelete = async () => {
    try {
      deleteCartItem({
        params: { id: _id },
      });

      deleteCartItemRecoil(_id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoToDetail = () => push(`/products/${product.slug}`);

  return (
    <div className="grid grid-cols-8 mt-2">
      <div
        className="col-span-2 row-span-3 flex items-center cursor-pointer"
        onClick={handleGoToDetail}
      >
        <Image
          src={product.images.find((image) => image.type === 'primary').url}
          alt={product.name}
          width={90}
          height={90}
          className="rounded-primary"
        />
      </div>
      <h5 className="col-span-5 subtitle-1 cursor-pointer" onClick={handleGoToDetail}>
        {product.name}
      </h5>
      <Button icon onClick={handleDelete} wrapper="col-span-1 justify-self-end">
        <CloseIcon />
      </Button>
      <p className="col-span-6">Kích thước {size}</p>
      <p className="col-span-1 w-6 mt-2 py-[0.5px] px-2 text-sm bg-primary-5">{quantity}</p>
      <span className="col-span-5 mt-2 subtitle-1 text-sm">{pricePerProduct}</span>
    </div>
  );
}
