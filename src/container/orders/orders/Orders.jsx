import Tab from 'src/components/Tab';
import { Search } from '../search';
import {
  TabAll,
  TabCancel,
  TabComplete,
  TabPendingPayment,
  TabProcessing,
  TabShipping,
} from '../tab';

export default function Orders() {
  const tabTitle = [
    'Tất cả đơn',
    'Chờ thanh toán',
    'Đang xử lý',
    'Đang vận chuyển',
    'Đã hoàn thành',
    'Đã hủy',
  ];

  const tabContent = [
    <TabAll />,
    <TabPendingPayment />,
    <TabProcessing />,
    <TabShipping />,
    <TabComplete />,
    <TabCancel />,
  ];

  return (
    <section className="mt-12">
      <Tab
        tabTitle={tabTitle}
        tabContent={tabContent}
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
