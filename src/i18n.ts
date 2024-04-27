import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";
import { APP_MODE } from "./app-constants";

const getLanguageFromLocalStorage = () => {
  const appStore = JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem("app-store"))));

  const lang = appStore.state.lang;

  return lang || "en";
};

i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    backend: {
      loadPath: "/locales/{{ns}}/{{lng}}.json",
    },
    debug: APP_MODE === "development",
    lng: getLanguageFromLocalStorage(),
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
