import { useState } from 'react';
import { useRecoilValue } from 'recoil';

import Tab from 'src/components/Tab';
import { useInfiniteLoading } from 'src/hooks';
import { userState } from 'src/recoils';
import { Search } from '../search';
import { TabAll, TabCancel, TabComplete, TabProcessing, TabShipping } from '../tab';

const TABS = [
  {
    title: 'Tất cả đơn',
    value: 'all',
    component: (props) => <TabAll {...props} />,
  },
  {
    title: 'Đang xử lý',
    value: 'confirm',
    component: (props) => <TabProcessing {...props} />,
  },
  {
    title: 'Đang vận chuyển',
    value: 'delivery',
    component: (props) => <TabShipping {...props} />,
  },
  {
    title: 'Đã hoàn thành',
    value: 'completed',
    component: (props) => <TabComplete {...props} />,
  },
  {
    title: 'Đã hủy',
    value: 'canceled',
    component: (props) => <TabCancel {...props} />,
  },
];

export default function Orders() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const { user } = useRecoilValue(userState);

  const tabValue = TABS.find((_, index) => index === selectedIndex).value;

  const { data, error, size, setSize, isLoadingMore, isReachingEnd } = useInfiniteLoading(
    [user._id],
    { status: tabValue, limit: 2 },
  );

  // console.log({ data, error, size, setSize, isLoadingMore, isReachingEnd });
  // console.log(data.orders?.map((order) => order.products).flat(1));
  const orders = data.orders?.map((order) => order.products).flat(1);

  return (
    <section className="mt-12">
      <Tab
        selectedIndex={selectedIndex}
        onTabChange={setSelectedIndex}
        tabs={TABS}
        orders={data.orders}
        wrapper="flex flex-col gap-8"
        tabList="flex mx-152-px bg-neutral-5"
        tab="flex justify-center w-[189px] py-2"
        tabSelected="subtitle-1 w-[189px] py-2 bg-primary-4 cursor-not-allowed"
      >
        <Search />
        <button onClick={() => setSize(size + 1)}>more</button>
      </Tab>
    </section>
  );
}
