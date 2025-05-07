import { i18n } from '@/main';
import { defineStore } from 'pinia'
import { ref } from 'vue';

export const useLanguageStore = defineStore('language-store', () => {
  const currentLanguage = ref(i18n.global.locale);

  const setNewLanguage = (language: string) => {
    i18n.global.locale = language;
    currentLanguage.value = language;
  }

  return { currentLanguage, setNewLanguage }
});

// Definition of the LanguageStore
/* interface Language {
  id: number
  value: string
}

const createToast = (value: string): Language => ({
  id: Math.random() * 1000,
  value,
})

const defaultTimeOut = 2000 */

// Pinia store for language
/* export const useLanguageStore = defineStore('language-store', {
  state: (): {
    lang: Language[]
  } => ({
    lang: [],
  }),
  actions: {
    updateLanguage(language: string) {
      const toast = createToast(language)

      this.lang.push(toast)
      setTimeout(() => {
        this.lang = this.lang.filter((t) => t.id !== toast.id)
      }, defaultTimeOut)
    },
  },
})
 */