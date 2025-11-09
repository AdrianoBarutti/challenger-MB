import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import pt from "../locales/pt.json";
import es from "../locales/es.json";

const deviceLocale = Localization.getLocales()[0]?.languageCode || "pt";
const deviceLanguage = deviceLocale.startsWith("es") ? "es" : "pt";

i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: "v4",
    lng: deviceLanguage,
    fallbackLng: "pt",
    resources: {
      pt: { translation: pt },
      es: { translation: es },
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
