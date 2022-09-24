import { useState } from 'react';

import Button from 'src/components/Button';
import { CheckIcon } from 'src/components/Icons';
import { TABS_FILTER } from '../tab-config';
import ModalLeaving from './ModalLeaving';
import ModalReview from './ModalReview';
import ReviewItem from './ReviewItem';

export default function TabReviews() {
  const [activeTab, setActiveTab] = useState(['all']);
  const [isOpen, setIsOpen] = useState({
    review: false,
    leaving: false,
  });

  const handleClickTab = (value) => {
    setActiveTab((prev) => {
      return prev.includes(value) ? prev.filter((tab) => tab !== value) : [...prev, value];
    });
  };

  const handleOpenModalReview = () => {
    return setIsOpen((prev) => ({ ...prev, review: true }));
  };

  return (
    <div className="grid grid-cols-12 gap-y-6 gap-x-14 mt-12">
      <div className="col-span-3 flex flex-col gap-4">
        <h5 className="heading-5">Đánh giá sản phẩm</h5>
        <div className="flex items-center gap-2">
          <div>* * * * *</div>
          <strong>5.0 Sao</strong>
        </div>
        <Button outline onClick={handleOpenModalReview}>
          Viết đánh giá
        </Button>
      </div>
      <ul className="col-span-9 flex flex-wrap gap-y-4 gap-x-5">
        {TABS_FILTER.map((item, index) => {
          const selectedTab = activeTab.includes(item.value);
          return (
            <li key={index}>
              <Button
                leftIcon={
                  selectedTab && <CheckIcon className={selectedTab ? 'fill-primary-1' : ''} />
                }
                onClick={() => handleClickTab(item.value)}
                wrapper={
                  selectedTab
                    ? 'justify-center py-[7px] px-6 rounded-primary border-2 border-primary-1'
                    : 'justify-center py-[7px] px-6 rounded-primary border-2 border-neutral-3'
                }
                title={selectedTab ? 'text-primary-1 ml-0' : 'text-neutral-3 ml-0'}
              >
                {item.title}
              </Button>
            </li>
          );
        })}
      </ul>
      <ul className="col-span-12 flex flex-col gap-9">
        <li>
          <ReviewItem />
        </li>
        <li>
          <ReviewItem />
        </li>
      </ul>

      <ModalReview isOpen={isOpen.review} setIsOpen={setIsOpen} />
      <ModalLeaving isOpen={isOpen.leaving} setIsOpen={setIsOpen} />
    </div>
  );
}
