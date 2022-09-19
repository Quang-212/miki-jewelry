import Image from 'src/components/Image';
import { formatVndCurrency } from 'src/utils/formatNumber';

export default function OrderItem({ data }) {
  const { product, size, quantity } = data;
  console.log(product);

  const generatePrice = () => {
    return product?.stocks.find((stock) => stock.size === size).price * quantity;
  };
  const price = formatVndCurrency(generatePrice());

  return (
    <div className="grid grid-cols-12 grid-rows-4">
      <div className="col-span-2 row-span-4 flex items-center justify-center relative w-[120px] h-[120px] border-1.5 border-primary-2">
        <Image
          src={product?.images.find((image) => image.type === 'primary').url}
          alt={`Ảnh ${product?.name}`}
          width={100}
          height={100}
        />
      </div>
      <h5 className="col-span-8 heading-5">{product?.name}</h5>
      <span className="col-span-2 justify-self-end heading-5 text-primary-2">{price}</span>
      <p className="col-span-10 text-neutral-2">Kích thước: {size}</p>
      <p className="col-span-10 text-neutral-2">Số lượng: {quantity}</p>
    </div>
  );
}
