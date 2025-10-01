import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import pt from "../locales/pt.json";
import es from "../locales/es.json"; // Importa o arquivo de espanhol

i18n.use(initReactI18next).init({
  lng: "pt", // idioma padrão
  fallbackLng: "es", // Agora o fallback é para o espanhol
  resources: {
    pt: { translation: pt },
    es: { translation: es }, // Adiciona a tradução em espanhol
  },
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;