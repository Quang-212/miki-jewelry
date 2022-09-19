import { Fragment } from 'react';
import Button from 'src/components/Button';

import { NormalDivider } from 'src/components/Dividers';
import OrderItem from './OrderItem';

export default function TabAll({ orders }) {
  console.log(orders);
  return (
    <ul className="flex flex-col gap-10 container py-8 bg-neutral-5">
      {orders?.map((order) => (
        <li key={order._id} className="flex flex-col justify-between gap-4">
          {order.products.map((product) => (
            <>
              <h5 className="heading-5 text-neutral-2">Mã đơn hàng: {product._id}</h5>
              <div className="grid grid-cols-12 grid-rows-4 mt-2">
                <div className="col-span-2 row-span-4 flex items-center justify-center relative w-[120px] h-[120px] border-1.5 border-primary-2">
                  {/* <Image
           src={product?.images.find((image) => image.type === 'primary').url}
           alt={`Ảnh ${product?.name}`}
           width={100}
           height={100}
         /> */}
                </div>
                <h5 className="col-span-8 heading-5">{product._id}</h5>
                <span className="col-span-2 justify-self-end heading-5 text-primary-2">
                  {product.quantity}
                </span>
                <p className="col-span-10 text-neutral-2">Kích thước: {product.size}</p>
                <p className="col-span-10 text-neutral-2">Số lượng: {product.quantity}</p>
              </div>
              <NormalDivider wrapper=" border-primary-5" />
              <div className="flex justify-end">
                <div className="grid grid-cols-12 grid-rows-3 gap-y-6 gap-x-4">
                  <p className="col-span-12 justify-self-end subtitle-1">Xem thêm 2 sản phẩm</p>
                  <p className="col-span-5 self-center heading-5">Tổng tiền: </p>
                  <span className="col-span-7 self-center justify-self-end heading-4 text-primary-2">
                    1.250.000đ
                  </span>
                  <Button outline wrapper="col-span-5">
                    Mua lại
                  </Button>
                  <Button outline internalLink={`/products/`} wrapper="col-span-7">
                    Xem chi tiết
                  </Button>
                </div>
              </div>
            </>
          ))}
        </li>
      ))}
    </ul>
  );
}
