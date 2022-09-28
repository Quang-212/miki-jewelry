import classNames from 'classnames/bind';
import { useState } from 'react';

import Button from 'src/components/Button';
import { CheckIcon } from 'src/components/Icons';
import { ModalCompleted, ModalLeaving, ModalReview } from 'src/container/reviews';
import { TABS_FILTER } from '../tab-config';
import CommentsList from './CommentsList';
import RatingStarsList from './RatingStarsList';
import RatingStarsPreview from './RatingStarsPreview';
import styles from './TabReviews.module.css';

const mk = classNames.bind(styles);

export default function TabReviews({ reviews = {} }) {
  const [activeTab, setActiveTab] = useState(['all']);
  const [isOpen, setIsOpen] = useState({
    review: false,
    leaving: false,
    completed: false,
  });
  console.log(reviews);

  const handleClickTab = (value) => {
    setActiveTab((prev) => {
      return prev.includes(value) ? prev.filter((tab) => tab !== value) : [...prev, value];
    });
  };

  const handleOpenModalReview = () => {
    return setIsOpen((prev) => ({ ...prev, review: true, leaving: false }));
  };

  return (
    <div className="grid grid-cols-12 gap-x-14 mt-12">
      <RatingStarsPreview data={reviews} />

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

      <RatingStarsList data={reviews.rating} />

      <Button outline onClick={handleOpenModalReview} wrapper="col-span-12 max-w-[242px] mt-4">
        Viết đánh giá
      </Button>

      <CommentsList data={reviews.feedbacks} />

      <ModalReview isOpen={isOpen.review} setIsOpen={setIsOpen} />
      <ModalLeaving isOpen={isOpen.leaving} setIsOpen={setIsOpen} />
      <ModalCompleted isOpen={isOpen.completed} setIsOpen={setIsOpen} />
    </div>
  );
}
