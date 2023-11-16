import { create } from "zustand";

type State = {
  signupState: {
    signuped: boolean;
    email: string;
  };
};

type Action = {
  setSignupState: (state: State["signupState"]) => void;
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
}));

export default useAppStore;
