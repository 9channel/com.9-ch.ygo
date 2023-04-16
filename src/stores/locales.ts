import { defineStore } from "pinia";
import type { langData } from "../components/i18n";
export const useLocalesStore = defineStore({
  id: "locales",
  state: () => ({
    // data 类型为 langData
    data: {} as langData,
  }),
  getters: {
    lang: (state) => state.data,
  },
  actions: {
    setLang(lang: langData) {
      this.data = lang;
    },
  },
});
