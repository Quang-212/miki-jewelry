import { Fragment } from 'react';

import { NormalDivider } from 'src/components/Dividers';
import OrderItem from './OrderItem';

export default function TabAll({ orders }) {
  return (
    <section className="flex flex-col gap-4 container py-8 bg-neutral-5">
      <h5 className="heading-5 text-neutral-2">Mã đơn hàng: 167495</h5>
      <ul className="flex flex-col gap-4">
        {orders?.map((order) => (
          <Fragment key={order._id}>
            <li>
              <OrderItem data={orders} />
            </li>
            <NormalDivider wrapper="border-primary-5" />
          </Fragment>
        ))}
      </ul>
    </section>
  );
}
