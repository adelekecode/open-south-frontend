import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

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
  lang: string;
  langId: string | null;
  agreeTerms: boolean;
};

type Action = {
  setSignupState: (state: State["signupState"]) => void;
  setDisplayLogoutModal: (state: State["displayLogoutModal"]) => void;
  setDisplaySelectAvatarModal: (state: State["displaySelectAvatarModal"]) => void;
  setUserLocation: (obj: { country: string; lat: number; lng: number }) => void;
  setLang: (lang: string) => void;
  setLangId: (langId: string) => void;
  setAgreeTerms: (bool: boolean) => void;
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
      lang: "en",
      setLang: (lang) => set({ lang }),
      langId: null,
      setLangId: (langId) => set({ langId }),
      agreeTerms: false,
      setAgreeTerms: (agreeTerms) => set({ agreeTerms }),
    }),
    {
      name: "app-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        lang: state.lang,
        langId: state.langId,
        agreeTerms: state.agreeTerms,
      }),
    }
  )
);

export default useAppStore;
