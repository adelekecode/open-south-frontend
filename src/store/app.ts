import { create } from "zustand";

type State = {
  signupState: {
    signuped: boolean;
    email: string;
  };
  displayLogoutModal: boolean;
  displaySelectAvatarModal: boolean;
};

type Action = {
  setSignupState: (state: State["signupState"]) => void;
  setDisplayLogoutModal: (state: State["displayLogoutModal"]) => void;
  setDisplaySelectAvatarModal: (state: State["displaySelectAvatarModal"]) => void;
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
  displaySelectAvatarModal: false,
  setDisplaySelectAvatarModal: (bool) =>
    set({
      displaySelectAvatarModal: bool,
    }),
}));

export default useAppStore;
