import { create } from "zustand";

type State = {
  signupState: {
    signuped: boolean;
    email: string;
  };
  currentPageName: string;
};

type Action = {
  setSignupState: (state: State["signupState"]) => void;
  setCurrentPageName: (state: State["currentPageName"]) => void;
};

const useAppStore = create<State & Action>((set) => ({
  signupState: {
    signuped: false,
    email: "",
  },
  setSignupState: (state) =>
    set({
      signupState: {
        ...state,
      },
    }),
  currentPageName: "",
  setCurrentPageName: (val) =>
    set({
      currentPageName: val,
    }),
}));

export default useAppStore;
