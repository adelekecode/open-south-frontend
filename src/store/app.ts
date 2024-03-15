import { create } from "zustand";

type State = {
  signupState: {
    signuped: boolean;
    email: string;
  };
  displayLogoutModal: boolean;
  displaySelectAvatarModal: boolean;
  userLocation: {
    country: string;
    lat: number;
    lng: number;
  } | null;
};

type Action = {
  setSignupState: (state: State["signupState"]) => void;
  setDisplayLogoutModal: (state: State["displayLogoutModal"]) => void;
  setDisplaySelectAvatarModal: (state: State["displaySelectAvatarModal"]) => void;
  setUserLocation: (obj: { country: string; lat: number; lng: number }) => void;
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
  userLocation: null,
  setUserLocation: (obj) =>
    set({
      userLocation: obj,
    }),
}));

export default useAppStore;
