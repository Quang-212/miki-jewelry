import { NormalDivider } from 'src/components/Dividers';
import Image from 'src/components/Image';
import { formatVndCurrency } from 'src/utils/formatNumber';

export default function OrderItem({ data }) {
  const orders = data.map((order) => order.products).flat(1);
  console.log(orders);

  // const generatePrice = () => {
  //   return product?.stocks.find((stock) => stock.size === size).price * quantity;
  // };
  // const price = formatVndCurrency(generatePrice());

  return (
    <>
      {orders.map((order) => (
        <li>
          <h5 className="font-primary font-bold text-xl leading-7 text-primary text-neutral-2">
            Mã đơn hàng: {order._id}
          </h5>
          <div className="grid grid-cols-12 grid-rows-4">
            <div className="col-span-2 row-span-4 flex items-center justify-center relative w-[120px] h-[120px] border-1.5 border-primary-2">
              {/* <Image
          src={product?.images.find((image) => image.type === 'primary').url}
          alt={`Ảnh ${product?.name}`}
          width={100}
          height={100}
        /> */}
            </div>
            <h5 className="col-span-8 font-primary font-bold text-xl leading-7 text-primary">{}</h5>
            <span className="col-span-2 justify-self-end font-primary font-bold text-xl leading-7 text-primary text-primary-2">
              {}
            </span>
            <p className="col-span-10 text-neutral-2">Kích thước: {}</p>
            <p className="col-span-10 text-neutral-2">Số lượng: {}</p>
          </div>
          <NormalDivider wrapper="border-primary-5" />
        </li>
      ))}
    </>
  );
}
