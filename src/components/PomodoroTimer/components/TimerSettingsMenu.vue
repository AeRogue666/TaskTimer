<script setup lang="ts">
import { capitalize, onMounted, ref, type Ref } from 'vue';
import { clearStorage, saveStorage } from '@/assets/js/storageFunctions';
import TimerItem from '../ui/TimerItem.vue';
import MenuOpacity from '@/components/ui/MenuOpacity.vue';
import { useI18n } from 'petite-vue-i18n';

const props = defineProps<{
    workvalue: number,
    shortbreakvalue: number,
    longbreakvalue: number,
}>(), emits = defineEmits<{
    updateworkvalue: [value: number],
    updateshorbreakvalue: [value: number],
    updatelongbreakvalue: [value: number],
}>();

const isMenuOpen = defineModel('isMenuOpen'), // Define component v-model 'isMenuOpen' to close menu on click
    isCyclesAuto = defineModel('isCyclesAuto'),
    cyclesNumber = defineModel('cyclesNumber');

const workingtimehours = ref(0), workingtimeminutes = ref(25), workingtimeseconds = ref(0),
    shortbreakhours = ref(0), shortbreakminutes = ref(5), shortbreakseconds = ref(0),
    longbreakhours = ref(0), longbreakminutes = ref(15), longbreakseconds = ref(0),
    workTimer = ref(props.workvalue), shortTimer = ref(props.shortbreakvalue), longTimer = ref(props.longbreakvalue);

const { t } = useI18n({});

function closeMenu() {
    isMenuOpen.value = false
}

function changeCycles() {
    isCyclesAuto.value = !isCyclesAuto.value
}

const updateTimer = (h: Ref, m: Ref, s: Ref, f: Ref) => { // Convert GMT value (HH:MM:ss) into seconds
    f.value = (h.value * 3600) + (m.value * 60) + (s.value);
},
    resetTimer = () => {
        workingtimehours.value = 0; workingtimeminutes.value = 25; workingtimeseconds.value = 0;
        shortbreakhours.value = 0; shortbreakminutes.value = 5; shortbreakseconds.value = 0;
        longbreakhours.value = 0; longbreakminutes.value = 15; longbreakseconds.value = 0;
        clearStorage();
        getSubmittedValues();
    },
    getSubmittedValues = () => {
        updateTimer(workingtimehours, workingtimeminutes, workingtimeseconds, workTimer);
        updateTimer(shortbreakhours, shortbreakminutes, shortbreakseconds, shortTimer);
        updateTimer(longbreakhours, longbreakminutes, longbreakseconds, longTimer);
        // console.log(workTimer.value, shortTimer.value, longTimer.value);
        emits('updateworkvalue', workTimer.value);
        emits('updateshorbreakvalue', shortTimer.value);
        emits('updatelongbreakvalue', longTimer.value);
        createStoreTimerValues(workTimer.value, shortTimer.value, longTimer.value);
        closeMenu();
    },
    createStoreTimerValues = (work: number, short: number, long: number) => {
        saveStorage('workingTime', work);
        saveStorage('shortbreakTime', short);
        saveStorage('longbreakTime', long);
    };

onMounted(() => {
    getSubmittedValues();
});
</script>

<template>
    <div v-if="isMenuOpen">
        <div
            class="flex flex-col justify-center items-center w-full h-full border border-solid border-gray-500 rounded-lg timer absolute z-50">
            <h2 class="text-2xl font-semibold mt-4">{{ capitalize(t('timersettings_title')) }}</h2>
            <button @click="closeMenu"
                class="flex border-none text-gray-500 rounded-lg absolute top-3 right-3 hover:text-blue-600">
                <font-awesome-icon :icon="['fas', 'xmark']" class="fa-xl"></font-awesome-icon>
            </button>
            <section class="flex flex-col justify-center items-center w-full h-full mt-4 px-2 gap-4">
                <div class="flex flex-col items-center w-full h-auto gap-4">
                    <TimerItem>
                        <template #heading>
                            <p class="text-xl">
                                {{ capitalize(t('work')) }}
                                <span class="text-base">({{ t('inmin') }})</span>
                            </p>
                        </template>
                        <template #labelhours>
                            <label for="workingtimehours" class="w-full h-auto text-base text-center absolute top-1">
                                {{ capitalize(t('hours')) }}
                            </label>
                        </template>
                        <template #inputhours>
                            <input v-model="workingtimehours" id="workingtimehours" type="number"
                                class="w-full h-full bg-transparent py-2 border-none rounded-l-lg text-xl text-center font-semibold focus:outline-2 focus:outline focus:outline-blue-600"
                                min="0" max="24">
                        </template>
                        <template #labelminutes>
                            <label for="workingtimeminutes" class="w-full h-auto text-base text-center absolute top-1">
                                {{ capitalize(t('minutes')) }}
                            </label>
                        </template>
                        <template #inputminutes>
                            <input v-model="workingtimeminutes" id="workingtimeminutes" type="number"
                                class="w-full h-full bg-transparent py-2 border-none text-xl text-center font-semibold focus:outline-2 focus:outline focus:outline-blue-600"
                                min="0" max="59">
                        </template>
                        <template #labelseconds>
                            <label for="workingtimeseconds" class="w-full h-auto text-base text-center absolute top-1">
                                {{ capitalize(t('seconds')) }}
                            </label>
                        </template>
                        <template #inputseconds>
                            <input v-model="workingtimeseconds" id="workingtimeseconds" type="number"
                                class="w-full h-full bg-transparent py-2 border-none rounded-r-lg text-xl text-center font-semibold focus:outline-2 focus:outline focus:outline-blue-600"
                                min="0" max="59">
                        </template>
                    </TimerItem>
                    <TimerItem>
                        <template #heading>
                            <p class="text-xl">{{ capitalize(t('short')) }} <span class="text-base">({{ t('inmin') }})</span>
                            </p>
                        </template>
                        <template #labelhours>
                            <label for="shortbreakhours" class="w-full h-auto text-base text-center absolute top-1">
                                {{ capitalize(t('hours')) }}
                            </label>
                        </template>
                        <template #inputhours>
                            <input v-model="shortbreakhours" id="shortbreakhours" type="number"
                                class="w-full h-full bg-transparent py-2 border-none rounded-l-lg text-xl text-center font-semibold focus:outline-2 focus:outline focus:outline-blue-600"
                                value="0" min="0" max="23">
                        </template>
                        <template #labelminutes>
                            <label for="shortbreakminutes" class="w-full h-auto text-base text-center absolute top-1">
                                {{ capitalize(t('minutes')) }}
                            </label>
                        </template>
                        <template #inputminutes>
                            <input v-model="shortbreakminutes" id="shortbreakminutes" type="number"
                                class="w-full h-full bg-transparent py-2 border-none text-xl text-center font-semibold focus:outline-2 focus:outline focus:outline-blue-600"
                                value="00" min="0" max="59">
                        </template>
                        <template #labelseconds>
                            <label for="shortbreakseconds" class="w-full h-auto text-base text-center absolute top-1">
                                {{ capitalize(t('seconds')) }}
                            </label>
                        </template>
                        <template #inputseconds>
                            <input v-model="shortbreakseconds" id="shortbreakseconds" type="number"
                                class="w-full h-full bg-transparent py-2 border-none rounded-r-lg text-xl text-center font-semibold focus:outline-2 focus:outline focus:outline-blue-600"
                                value="00" min="0" max="59">
                        </template>
                    </TimerItem>
                    <TimerItem>
                        <template #heading>
                            <p class="text-xl">
                                {{ capitalize(t('long')) }}
                                <span class="text-base">({{ t('inmin') }})</span>
                            </p>
                        </template>
                        <template #labelhours>
                            <label for="longbreakhours" class="w-full h-auto text-base text-center absolute top-1">
                                {{ capitalize(t('hours')) }}
                            </label>
                        </template>
                        <template #inputhours>
                            <input v-model="longbreakhours" id="longbreakhours" type="number"
                                class="w-full h-full bg-transparent py-2 border-none rounded-l-lg text-xl text-center font-semibold focus:outline-2 focus:outline focus:outline-blue-600"
                                value="0" min="0" max="23">
                        </template>
                        <template #labelminutes>
                            <label for="longbreakminutes" class="w-full h-auto text-base text-center absolute top-1">
                                {{ capitalize(t('minutes')) }}
                            </label>
                        </template>
                        <template #inputminutes>
                            <input v-model="longbreakminutes" id="longbreakminutes" type="number"
                                class="w-full h-full bg-transparent py-2 border-none text-xl text-center font-semibold focus:outline-2 focus:outline focus:outline-blue-600"
                                value="00" min="0" max="59">
                        </template>
                        <template #labelseconds>
                            <label for="longbreakseconds" class="w-full h-auto text-base text-center absolute top-1">
                                {{ capitalize(t('seconds')) }}
                            </label>
                        </template>
                        <template #inputseconds>
                            <input v-model="longbreakseconds" id="longbreakseconds" type="number"
                                class="w-full h-full bg-transparent py-2 border-none rounded-r-lg text-xl text-center font-semibold focus:outline-2 focus:outline focus:outline-blue-600"
                                value="00" min="0" max="59">
                        </template>
                    </TimerItem>
                </div>
                <div class="flex flex-col items-center w-full h-auto">
                    <p class="text-xl font-normal">
                        {{ capitalize(t('setcycles_title')) }}
                        <span class="text-base">({{ t('setcycles_subtitle') }})</span>
                    </p>
                    <div class="inline-flex items-center gap-2">
                        <label for="switch-component-on" class="text-sm cursor-pointer">
                            {{ capitalize(t('manual')) }}
                        </label>
                        <div class="relative inline-block w-11 h-5">
                            <input v-model="isCyclesAuto" @click="changeCycles" id="switch-component-on" type="checkbox"
                                class="peer appearance-none w-11 h-5 bg-slate-100 rounded-full checked:bg-slate-800 cursor-pointer transition-colors duration-300" />
                            <label for="switch-component-on"
                                class="absolute top-0 left-0 w-5 h-5 bg-white rounded-full border border-slate-300 shadow-sm transition-transform duration-300 peer-checked:translate-x-6 peer-checked:border-slate-800 cursor-pointer">
                            </label>
                        </div>
                        <label for="switch-component-on" class="text-sm cursor-pointer">
                            {{ capitalize(t('auto')) }}
                        </label>
                    </div>
                    <div v-if="isCyclesAuto == true" class="flex flex-col items-center w-auto h-auto py-4 gap-2">
                        <label for="number-cycles" class="text-lg font-normal">
                            {{ capitalize(t('setcycles_number_title')) }}
                            <span class="text-base">(Min: 1, Max: 10)</span></label>
                        <input v-model="cyclesNumber" id="number-cycles" type="number"
                            class="w-24 h-auto bg-transparent border-2 border-solid border-blue-300 rounded-lg text-xl text-center font-semibold focus:outline-2 focus:outline focus:outline-blue-600"
                            value="0" min="1" max="10">
                    </div>
                </div>
                <div class="flex flex-col justify-center items-center w-full h-auto mb-4">
                    <button @click.prevent="getSubmittedValues"
                        class="inline-flex justify-center items-center w-1/2 h-16 mt-6 px-4 py-2 bg-green-700 text-2xl font-semibold text-white hover:bg-blue-600 border-none rounded-xl mb-auto">
                        <font-awesome-icon :icon="['fas', 'check']" class="fa-lg px-2"></font-awesome-icon>
                        {{ capitalize(t('validate')) }}
                    </button>
                    <button @click.prevent="resetTimer"
                        class="inline-flex justify-center items-center w-1/2 h-16 mt-6 px-4 py-2 bg-red-700 text-2xl font-semibold text-white hover:bg-blue-600 border-none rounded-xl mb-auto">
                        <font-awesome-icon :icon="['fas', 'backspace']" class="fa-lg px-2"></font-awesome-icon>
                        {{ capitalize(t('reset')) }}
                    </button>
                </div>
            </section>
        </div>
        <MenuOpacity />
    </div>
</template>

<style scoped>
.timer {
    width: 100%;
    height: 64%;
    top: 26.2%;
    left: 0;
    background-color: var(--color-background);
}

@media (min-width: 63rem) {
    .timer {
        width: 50%;
        height: 100%;
        top: 0;
        left: 25%;
    }
}
</style>