import { create } from "zustand";

type State = {
  signupState: {
    signuped: boolean;
    email: string;
  };
  displayLogoutModal: boolean;
};

type Action = {
  setSignupState: (state: State["signupState"]) => void;
  setDisplayLogoutModal: (state: State["displayLogoutModal"]) => void;
};

const useAppStore = create<State & Action>()((set) => ({
  signupState: {
    signuped: false,
    email: "",
  },
  setSignupState: (state) =>
    set({
      signupState: state,
    }),
  displayLogoutModal: false,
  setDisplayLogoutModal: (bool) =>
    set({
      displayLogoutModal: bool,
    }),
}));

export default useAppStore;
