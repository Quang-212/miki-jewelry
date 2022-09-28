import { atom } from 'recoil';
import persistAtom from 'src/utils/recoilPersist';

export const userState = atom({
  key: 'authentication',
  default: {
    user: {},
    access_token: '',
    isAuthenticated: false,
  },
  effects_UNSTABLE: [persistAtom],
});
