import { atom } from 'recoil';

export const feedbackFilterState = atom({
  key: 'feedbackFilter',
  default: {
    type: 'all',
    filters: {
      rating: [],
      others: [],
    },
  },
});
