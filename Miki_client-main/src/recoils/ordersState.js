import { atom } from "recoil";

export const ordersState = atom({
    key: 'orders',
    default: [],
    //effects_UNSTABLE: [persistAtom], //auto persist and sync with local-storage
    effects_UNSTABLE: [],
  });