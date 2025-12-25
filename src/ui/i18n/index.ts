import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en.json";
import zhCN from "./locales/zh-CN.json";

export const resources = {
    en: { translation: en },
    "zh-CN": { translation: zhCN },
} as const;

export const supportedLanguages = [
    { code: "en", name: "English", nativeName: "English" },
    { code: "zh-CN", name: "Chinese (Simplified)", nativeName: "简体中文" },
] as const;

void i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: "en",
        debug: false,
        interpolation: {
            escapeValue: false, // React already escapes values
        },
        detection: {
            order: ["localStorage", "navigator"],
            caches: ["localStorage"],
            lookupLocalStorage: "chorus-language",
        },
    });

export default i18n;
