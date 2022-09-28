import classNames from 'classnames/bind';
import { isEmpty } from 'lodash';
import { useMemo, useState } from 'react';
import { useRecoilState } from 'recoil';

import Button from 'src/components/Button';
import { CheckIcon } from 'src/components/Icons';
import { ModalCompleted, ModalLeaving, ModalReview } from 'src/container/reviews';
import { feedbackFilterState } from 'src/recoils/feedbackFilterState';
import CommentsList from './CommentsList';
import RatingStarsList from './RatingStarsList';
import RatingStarsPreview from './RatingStarsPreview';
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
    completed: false,
  });
  console.log(reviews);

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

  return (
    <div className="grid grid-cols-12 gap-x-14 mt-12">
      <RatingStarsPreview data={reviews} />

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
