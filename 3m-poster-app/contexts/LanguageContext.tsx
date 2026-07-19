import React, { createContext, useState, useContext, ReactNode } from 'react';

type Language = 'ar' | 'en';

export const translations = {
  ar: {
    settingsTitle: "إعدادات التطبيق",
    arabicBtn: "تفعيل العربية",
    englishBtn: "تفعيل الإنجليزية",
    tabHome: "الرئيسية",
    tabGroups: "الجروبات",
    tabInbox: "الرسائل",
    tabCreator: "المحتوى",
    tabAccounts: "الحسابات",
    tabSettings: "الإعدادات",
    tabCampaigns: "الحملات",
  },
  en: {
    settingsTitle: "App Settings",
    arabicBtn: "Arabic",
    englishBtn: "English",
    tabHome: "Home",
    tabGroups: "Groups",
    tabInbox: "Inbox",
    tabCreator: "Creator",
    tabAccounts: "Accounts",
    tabSettings: "Settings",
    tabCampaigns: "Campaigns",
  }
};

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations.ar;
  isRTL: boolean;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('ar');

  const value = {
    language,
    setLanguage: setLanguageState,
    t: translations[language],
    isRTL: language === 'ar'
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage error');
  }
  return context;
}