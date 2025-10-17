import { atom } from 'recoil';
//if you wanna persist state to local, import recoilPersist like below
//import persistAtom from 'src/utils/recoilPersist';

export const cartState = atom({
  key: 'cartItems',
  default: [],
  //effects_UNSTABLE: [persistAtom], //auto persist and sync with local-storage
  effects_UNSTABLE: [],
});
