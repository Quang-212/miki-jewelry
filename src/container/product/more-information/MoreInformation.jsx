import Tab from 'src/components/Tab';
import { TabComments, TabDescription, TabShipping, TabWarrantyReturn } from '../tab';

export function MoreInformation() {
  const tabTitle = ['Mô tả', 'Bảo hành và Hoàn trả', 'Vận chuyển', 'Đánh giá(02)'];

  const tabContent = [<TabDescription />, <TabWarrantyReturn />, <TabShipping />, <TabComments />];

  const tabs = [
    {
      title: 'Mô tả',
      component: <TabDescription />,
    },
    {
      title: 'Bảo hành và Hoàn trả',
      component: <TabWarrantyReturn />,
    },
    {
      title: 'Vận chuyển',
      component: <TabShipping />,
    },
    {
      title: 'Đánh giá(02)',
      component: <TabComments />,
    },
  ];

  return (
    <section className="mt-9">
      <Tab
        tabs={tabs}
        wrapper="flex flex-col gap-12"
        tabList="flex justify-between"
        tab="heading-5 text-neutral-3"
        tabSelected="heading-5 text-primary-1 underline decoration-[1.2px] underline-offset-8 decoration-primary-1 cursor-not-allowed"
      />
    </section>
  );
}
