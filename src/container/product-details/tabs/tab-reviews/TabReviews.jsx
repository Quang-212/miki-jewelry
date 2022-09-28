import classNames from 'classnames/bind';
import { isEmpty } from 'lodash';
import { useMemo, useState } from 'react';
import { useRecoilState } from 'recoil';

import Button from 'src/components/Button';
import { CheckIcon, RatingStarIcon } from 'src/components/Icons';
import { ProgressBarRating } from 'src/components/ProgressBarRating';
import { feedbackFilterState } from 'src/recoils/feedbackFilterState';
import ModalLeaving from './ModalLeaving';
import ModalReview from './ModalReview';
import ReviewItem from './ReviewItem';
import styles from './TabReviews.module.css';

const mk = classNames.bind(styles);
const INIT_ACTIVE_TAB = {
  type: 'all',
  filters: {
    rating: [],
    others: [],
  },
};

export default function TabReviews({ reviews = {} }) {
  const [activeTab, setActiveTab] = useRecoilState(feedbackFilterState);

  const [isOpen, setIsOpen] = useState({
    review: false,
    leaving: false,
  });
  const TABS_FILTER = useMemo(
    () => [
      {
        title: 'Tất cả',
        type: 'find_type',
        value: 'all',
      },
      ...reviews.rating.map((item, index) => ({
        title: `${5 - index} Sao (${item.count})`,
        type: 'rating',
        value: item.star,
      })),
      {
        title: 'Mới nhất',
        type: 'order',
        value: 'newest', // duo to server
      },
      {
        title: `Có bình luận (${reviews.properties.hasCommentCount})`,
        type: 'property',
        value: 'hasComment',
      },
      {
        title: `Có hình ảnh/ video (${reviews.properties.hasMediaCount})`,
        type: 'property',
        value: 'hasMedia',
      },
    ],
    [reviews],
  );
  const handleClickTab = (type, value) => {
    setActiveTab(({ filters }) => {
      const handleFilter = (value, preAccumulator = []) => {
        return preAccumulator.includes(value)
          ? preAccumulator.filter((item) => item !== value)
          : [...preAccumulator, value];
      };

      if (value === 'all') {
        return INIT_ACTIVE_TAB;
      }
      const result = {
        type: 'filter',
        filters: {
          rating: type === 'rating' ? handleFilter(value, filters.rating) : filters.rating,
          others: type !== 'rating' ? handleFilter(value, filters.others) : filters.others,
        },
      };
      return isEmpty(result.filters.rating) && isEmpty(result.filters.others)
        ? INIT_ACTIVE_TAB
        : result;
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
          const selectedTab = (type, index) => {
            if (index === 0) {
              return activeTab.type === 'all';
            }
            if (type === 'rating') {
              return activeTab.filters[type].includes(item.value);
            }
            return activeTab.filters['others'].includes(item.value);
          };
          return (
            <li key={index}>
              <Button
                leftIcon={
                  selectedTab(item.type, index) && (
                    <CheckIcon className={selectedTab(item.type, index) ? 'fill-primary-1' : ''} />
                  )
                }
                onClick={() => handleClickTab(item.type, item.value)}
                wrapper={
                  selectedTab(item.type, index)
                    ? 'justify-center py-[7px] px-6 rounded-primary border-2 border-primary-1'
                    : 'justify-center py-[7px] px-6 rounded-primary border-2 border-neutral-3'
                }
                title={
                  selectedTab(item.type, index) ? 'text-primary-1 ml-0' : 'text-neutral-3 ml-0'
                }
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
