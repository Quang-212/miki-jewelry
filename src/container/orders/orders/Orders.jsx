import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import Tab from 'src/components/Tab';
import { useOrders } from 'src/hooks';
import { userState } from 'src/recoils';
import { Search } from '../search';
import {
  TabAll,
  TabCancel,
  TabComplete,
  TabPendingPayment,
  TabProcessing,
  TabShipping,
} from '../tab';

const TABS = [
  {
    title: 'Tất cả đơn',
    value: 'all',
    component: <TabAll />,
  },
  {
    title: 'Đang xử lý',
    value: 'confirm',
    component: <TabProcessing />,
  },
  {
    title: 'Đang vận chuyển',
    value: 'delivery',
    component: <TabShipping />,
  },
  {
    title: 'Đã hoàn thành',
    value: 'completed',
    component: <TabComplete />,
  },
  {
    title: 'Đã hủy',
    value: 'canceled',
    component: <TabCancel />,
  },
];

export default function Orders() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const { user } = useRecoilValue(userState);

  const tabValue = TABS.find((_, index) => index === selectedIndex).value;

  const { ordersState } = useOrders([user._id], {
    status: tabValue,
  });

  console.log(ordersState);

  return (
    <section className="mt-12">
      <Tab
        selectedIndex={selectedIndex}
        onTabChange={setSelectedIndex}
        tabs={TABS}
        wrapper="flex flex-col gap-8"
        tabList="flex mx-152-px bg-neutral-5"
        tab="flex justify-center w-[189px] py-2"
        tabSelected="subtitle-1 w-[189px] py-2 bg-primary-4 cursor-not-allowed"
      >
        <Search />
      </Tab>
    </section>
  );
}
