import Tab from 'src/components/Tab';
import { TabComments, TabDescription, TabShipping, TabWarrantyReturn } from './tab-content';

export function ProductMoreInformationSection() {
  const tabTitle = ['Mô tả', 'Bảo hành và Hoàn trả', 'Vận chuyển', 'Đánh giá(02)'];

  const tabContent = [<TabDescription />, <TabWarrantyReturn />, <TabShipping />, <TabComments />];

  return (
    <section className="mt-9">
      <Tab
        tabTitle={tabTitle}
        tabContent={tabContent}
        wrapper="flex flex-col gap-12"
        tabList="flex justify-between"
        tab="heading-5 text-neutral-3"
        tabSelected="heading-5 text-primary-1 underline decoration-[1.2px] underline-offset-8 decoration-primary-1 cursor-not-allowed"
      />
    </section>
  );
}
