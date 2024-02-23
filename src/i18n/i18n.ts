import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import EN_US from "./languages/en_US.json";

export const resources = {
  en_US: {
    translation: EN_US,
  },
} as const;

i18n.use(initReactI18next).init({
  fallbackLng: "en_US",
  resources,
});
