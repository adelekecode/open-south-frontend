import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

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

const useAppStore = create<State & Action>()(
  persist(
    (set) => ({
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
    }),
    {
      name: "app-store",
      partialize: ({ currentPageName }) => {
        currentPageName;
      },
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useAppStore;
