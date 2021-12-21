import { RecoilRoot, atom, selector, useRecoilState, useRecoilValue } from "recoil";

//[firebase Auth Token]
export const idTokenState = atom({
  key: "idTokenState",
  default: [],
});
export const getIdTokenState = selector({
  key: "getIdTokenState",
  get: ({ get }) => {
    return get(idTokenState);
  },
});

//[LoadingProcess]
export const loadingState = atom({
  key: "loadingState",
  default: false,
});
export const getLoadingState = selector({
  key: "getLoadingState",
  get: ({ get }) => {
    return get(loadingState);
  },
});
