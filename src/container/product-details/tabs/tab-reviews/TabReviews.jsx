import { useState } from 'react';
import classNames from 'classnames/bind';

import Button from 'src/components/Button';
import { CheckIcon, RatingStarIcon } from 'src/components/Icons';
import { averageRating } from 'src/utils/averageRating';
import RatingStar from 'src/components/RatingStar';
import { TABS_FILTER } from '../tab-config';
import ModalLeaving from './ModalLeaving';
import ModalReview from './ModalReview';
import ReviewItem from './ReviewItem';
import styles from './TabReviews.module.css';
import { ProgressBarRating } from 'src/components/ProgressBarRating';

const mk = classNames.bind(styles);

export default function TabReviews({ reviews = {} }) {
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
    return setIsOpen((prev) => ({ ...prev, review: true, leaving: false }));
  };

  const ProgressBar = ({ done }) => {
    return (
      <div className={mk('progress')}>
        <div className={mk('progress-done')} style={{ width: `${done}%`, opacity: 1 }}></div>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-12 gap-y-6 gap-x-14 mt-12">
      <div className="col-span-3 flex flex-col gap-4">
        <h5 className="heading-5">Đánh giá sản phẩm</h5>
        <div className="grid grid-cols-12">
          <p className="col-span-3 row-span-2 heading-2 text-primary-2">4.9</p>
          <ul className="col-span-9 flex gap-1 ml-2">
            <li>
              <RatingStarIcon width="24" height="24" className="text-active-star" />
            </li>
            <li>
              <RatingStarIcon width="24" height="24" className="text-active-star" />
            </li>
            <li>
              <RatingStarIcon width="24" height="24" className="text-active-star" />
            </li>
            <li>
              <RatingStarIcon width="24" height="24" className="text-active-star" />
            </li>
            <li>
              <RatingStarIcon width="24" height="24" className="text-active-star" />
            </li>
          </ul>
          <small className="col-span-9 mt-1 ml-3 text-neutral-1">28 nhận xét</small>
          <ul className="col-span-12 mt-2">
            <li className="flex justify-between items-center gap-2">
              <ul className="flex gap-1">
                <li>
                  <RatingStarIcon width="14" height="14" className="text-active-star" />
                </li>
                <li>
                  <RatingStarIcon width="14" height="14" className="text-active-star" />
                </li>
                <li>
                  <RatingStarIcon width="14" height="14" className="text-active-star" />
                </li>
                <li>
                  <RatingStarIcon width="14" height="14" className="text-active-star" />
                </li>
                <li>
                  <RatingStarIcon width="14" height="14" className="text-active-star" />
                </li>
              </ul>
              <ProgressBarRating done="80" />
              <small className="text-neutral-1">26</small>
            </li>
            <li>qwertyu</li>
            <li>qwertyu</li>
            <li>qwertyu</li>
            <li>qwertyu</li>
          </ul>
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
        {reviews.feedbacks.map((feedback) => (
          <li key={feedback}>
            <ReviewItem feedback={feedback} />
          </li>
        ))}
      </ul>

      <ModalReview isOpen={isOpen.review} setIsOpen={setIsOpen} />
      <ModalLeaving isOpen={isOpen.leaving} setIsOpen={setIsOpen} />
    </div>
  );
}
