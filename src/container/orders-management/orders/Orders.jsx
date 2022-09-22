import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useInView } from 'react-intersection-observer';

import Tab from 'src/components/Tab';
import { useDebounce, useInfiniteLoading } from 'src/hooks';
import { userState } from 'src/recoils';
import { Search } from '../search';
import { TabAll, TabCanceled, TabCompleted, TabProcessing, TabShipping } from '../tab';
import { isEmpty } from 'lodash';
import useMyInfiniteLoading from 'src/hooks/useMyInfiniteLoading';
import { formatReplaceString } from 'src/utils/formatString';

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
    component: (props) => <TabCompleted {...props} />,
  },
  {
    title: 'Đã hủy',
    value: 'canceled',
    component: (props) => <TabCanceled {...props} />,
  },
];

export default function Orders() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState({
    status: false,
    value: '',
  });

  const { user } = useRecoilValue(userState);

  const tabValue = TABS.find((_, index) => index === selectedIndex).value;

  const debouncedValue = useDebounce(formatReplaceString(search.value), 600);

  const { data, isError, isLoadingMore, isReachingEnd } = useMyInfiniteLoading(
    [user._id],
    {
      status: tabValue,
      limit: 2,
      page,
      search: debouncedValue,
    },
    search.status,
  );

  useEffect(() => {
    setPage(0);
  }, [debouncedValue]);

  const { ref, inView } = useInView({});

  useEffect(() => {
    if (inView) {
      setPage((prev) => prev + 1);
      search.status && setSearch((prev) => ({ ...prev, status: false }));
    }
  }, [inView]);

  if (isError) return <h2>{isError}</h2>;

  return (
    <section className="mt-12">
      <Tab
        selectedIndex={selectedIndex}
        onTabChange={setSelectedIndex}
        tabs={TABS}
        orders={data.orders}
        isLoadingMore={isLoadingMore}
        wrapper="flex flex-col gap-8"
        tabList="flex justify-between mx-152-px bg-neutral-5"
        tab="flex justify-center w-[230px] py-2"
        tabSelected="subtitle-1 w-[230px] py-2 bg-primary-4 cursor-not-allowed"
      >
        <Search searchValue={search.value} onSearch={setSearch} />
      </Tab>
      {!isReachingEnd && !isEmpty(data.orders) && <div ref={ref} className="h-[2px]"></div>}
    </section>
  );
}
