import { useState } from 'react';
import Button from 'src/components/Button';
import { CheckIcon } from 'src/components/Icons';
import { TABS_FILTER } from '../tab-config';
import TabFilter from './TabFilter';

export default function TabReviews() {
  const [active, setActive] = useState(0);

  return (
    <div className="grid grid-cols-12 gap-x-14">
      <div className="col-span-3 flex flex-col gap-4">
        <h5 className="heading-5">Đánh giá sản phẩm</h5>
        <div className="flex items-center gap-2">
          <div>* * * * *</div>
          <strong>5.0 Sao</strong>
        </div>
        <Button outline>Viết đánh giá</Button>
      </div>
      <ul className="col-span-9 flex flex-wrap gap-y-4 gap-x-6">
        {TABS_FILTER.map((item, index) => {
          const activeTab = active === index;
          return (
            <li key={index}>
              <Button
                leftIcon={activeTab && <CheckIcon className={activeTab ? 'fill-primary-1' : ''} />}
                onClick={() => setActive(index)}
                wrapper={
                  activeTab
                    ? 'justify-center py-[7px] px-6 rounded-primary border-2 border-primary-1'
                    : 'justify-center py-[7px] px-6 rounded-primary border-2 border-neutral-3'
                }
                title={activeTab ? 'text-primary-1' : 'text-neutral-3'}
              >
                {item.title}
              </Button>
            </li>
          );
        })}
      </ul>
      <ul className="col-span-12 flex flex-col">
        <li></li>
      </ul>
    </div>
  );
}
