import './assets/css/styles.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'petite-vue-i18n'
import App from './App.vue'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faBackspace, faBrain, faCheck, faCircleExclamation, faCircleInfo, faClock, faGear, faHourglass, faList, faMoon, faPause, faPlay, faPlus, faStar, faSun, faTrashCan, faTriangleExclamation, faWalking, faXmark } from '@fortawesome/free-solid-svg-icons'
import clickOutsideDirective from '@/directives/clickOutsideDirective.ts'
import en_loc from '@/locales/en.ts';
import fr_loc from '@/locales/fr.ts';

library.add( faGear, faPlus, faBrain, faPause, faClock, faPlay, faList, faCheck, faXmark, faHourglass, faWalking, faBackspace, faSun, faMoon, faStar, faTrashCan, faTriangleExclamation, faCircleExclamation, faCircleInfo)

const app = createApp(App), pinia = createPinia()

export const i18n = createI18n({
    locale: 'en',
    fallbackLocale: 'fr',
    messages: {
        en: en_loc,
        fr: fr_loc,
    }
})

app
.component('font-awesome-icon', FontAwesomeIcon)
.directive('click-outside', clickOutsideDirective)
.use(router)
.use(pinia)
.use(i18n)
.mount('#app')