import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useInView } from 'react-intersection-observer';

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
  console.log(isLoadingMore);

  const { ref, inView } = useInView({});

  useEffect(() => {
    inView && setSize(size + 1);
    // inView && console.log('loaded more');
  }, [inView]);

  console.log(data);

  return (
    <section className="mt-12">
      <Tab
        selectedIndex={selectedIndex}
        onTabChange={setSelectedIndex}
        tabs={TABS}
        orders={data.orders}
        // isLoadingMore={isLoadingMore}
        wrapper="flex flex-col gap-8"
        tabList="flex justify-between mx-152-px bg-neutral-5"
        tab="flex justify-center w-[230px] py-2"
        tabSelected="subtitle-1 w-[230px] py-2 bg-primary-4 cursor-not-allowed"
      >
        <Search />
      </Tab>
      {isLoadingMore && <div ref={ref} className="h-[2px]"></div>}
    </section>
  );
}
