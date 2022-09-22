import Tab from 'src/components/Tab';
import { TabComments, TabDescription, TabShipping, TabWarrantyReturn } from '../tab';

export function MoreInformation() {
  const TABS = [
    {
      title: 'Mô tả',
      component: (props) => <TabDescription {...props} />,
    },
    {
      title: 'Bảo hành và Hoàn trả',
      component: (props) => <TabWarrantyReturn {...props} />,
    },
    {
      title: 'Vận chuyển',
      component: (props) => <TabShipping {...props} />,
    },
    {
      title: 'Đánh giá(02)',
      component: (props) => <TabComments {...props} />,
    },
  ];

  return (
    <section className="mt-9">
      <Tab
        tabs={TABS}
        wrapper="flex flex-col gap-12"
        tabList="flex justify-between"
        tab="font-primary font-bold text-xl leading-7 text-primary text-neutral-3"
        tabSelected="font-primary font-bold text-xl leading-7 text-primary text-primary-1 underline decoration-[1.2px] underline-offset-8 decoration-primary-1 cursor-not-allowed"
      />
    </section>
  );
}
