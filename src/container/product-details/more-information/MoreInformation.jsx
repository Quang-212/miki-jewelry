import classNames from 'classnames/bind';

import Tab from 'src/components/Tab';
import { TabReviews, TabDescription, TabShipping, TabWarrantyReturn } from '../tabs';
import styles from './MoreInformation.module.css';

const mk = classNames.bind(styles);

export function MoreInformation({ reviews = {} }) {
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
      title: `Đánh giá (${reviews.total || 0})`,
      component: (props) => <TabReviews {...props} />,
    },
  ];

  return (
    <section className="mt-9">
      <Tab
        reviews={reviews}
        tabs={TABS}
        wrapper={mk('tabs-wrapper')}
        tabList={mk('tabs-list')}
        tab={mk('tab')}
        tabSelected={mk('tab-selected')}
      />
    </section>
  );
}
