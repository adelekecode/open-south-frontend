import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";
import moment from "moment";
import { APP_MODE } from "./app-constants";
import "moment/locale/fr";

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

i18n.on("languageChanged", (lng) => {
  if (lng) moment.locale(lng.toLowerCase());
});

export default i18n;
