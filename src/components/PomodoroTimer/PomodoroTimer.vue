<script setup lang="ts">
import { capitalize, computed, onMounted, ref } from 'vue'
import TimerSettingsMenu from './components/TimerSettingsMenu.vue';
import TimerManualCyclesMenu from './components/TimerManualCyclesMenu.vue';
import ToasterTransition from './components/ToasterTransition.vue';
import { useToasterStore } from '@/stores/toasterStore';
import { useI18n } from 'petite-vue-i18n';

const time = ref<number>(1500), tT = ref<number>(time.value), work = ref<number>(0), short = ref<number>(0), long = ref<number>(0); // Timer settings values
const isTimerMenuOpen = ref<boolean>(false), isManualCyclesMenuOpen = ref<boolean>(false); // Timer menu
const isRunning = ref<boolean>(false), isTimeOut = ref<boolean>(false), isTimerReset = ref<boolean>(false); // Timer states
const cycles = ref<number>(1), isCyclesAuto = ref<boolean>(false), cyclesNumberBeforeLongBreak = ref<number>(3),
    cyclesType = ref<string>('work'), manualStartNewCycle = ref<boolean>(false), manualCycleAnswer = ref<number>(0); // Timer cycles
const progressBarWidth = ref<string>('100%'), progressBarColor = ref<string>('bg-gray-600'); // Timer progress bar styles and classes
const { t } = useI18n({});
let timer: number | undefined;

const toasterStore = useToasterStore();

const changeTimerValue = (value: number, type?: string) => {
    time.value = value;
    if (type) cyclesType.value = type;
},
    startTimer = () => {
        isRunning.value = true; isTimerReset.value = false; isTimeOut.value = false;
        tT.value = time.value;
        timer = setInterval(() => {
            if (time.value > 0) {
                time.value--;
                progressBarWidth.value = `${(time.value / tT.value) * 100}%`
            } else {
                stopTimer();
                cyclesChange();
                isTimeOut.value = true;
            }
        }, 1000);
    },
    stopTimer = () => {
        clearInterval(timer);
        isRunning.value = false;
    },
    resetTimer = () => {
        stopTimer();
        if (cyclesType.value == 'work') {
            time.value = work.value
        } else if (cyclesType.value == 'short') {
            time.value = short.value
        } else if (cyclesType.value == 'long') {
            time.value = long.value
        }
        isTimeOut.value = false;
        isTimerReset.value = true;
        progressBarWidth.value = '100%';
        progressBarColor.value = 'bg-gray-600';
    },
    cyclesChange = () => {
        if (!Number.isInteger(cycles.value / cyclesNumberBeforeLongBreak.value)) { // Work + Short break cycles
            if (tT.value == work.value) {
                changeTimerValue(short.value, 'short');
                startTimer();
                notificationController('short');
            } else if (tT.value == short.value) {
                if (isCyclesAuto.value == true) {
                    changeTimerValue(work.value, 'work');
                    cycles.value++
                    startTimer();
                } else {
                    isManualCyclesMenuOpen.value = true
                    notificationController('ended');
                }
            }
        } else { // Work + Long break cycles
            if (tT.value == work.value) {
                changeTimerValue(long.value, 'long');
                startTimer();
                notificationController('long');
            } else if (tT.value == long.value) {
                if (isCyclesAuto.value == true) {
                    changeTimerValue(work.value, 'work');
                    cycles.value++
                    startTimer();
                } else {
                    isManualCyclesMenuOpen.value = true
                    notificationController('ended');
                }
            }
        }
        console.log('temp timer: ', tT.value, ' work/short/long: ', work.value, short.value, long.value, ' time: ', time.value, ' cycles: ', cycles.value, ' beforelongbreak: ', cyclesNumberBeforeLongBreak.value, ' isInteger: ', Number.isInteger(cycles.value / cyclesNumberBeforeLongBreak.value));
    },
    startNewCycle = (v: boolean, s: string) => {
        manualStartNewCycle.value = v;
        if (manualStartNewCycle.value == true && (s == 'long' || s == 'short')) {
            changeTimerValue(work.value, 'work');
            cycles.value++
            startTimer();
            manualCycleAnswer.value = 1;
        } else if (manualStartNewCycle.value == false) {
            changeTimerValue(work.value, 'work');
            manualCycleAnswer.value = 2;
        }
        manualStartNewCycle.value = false;
        manualCycleAnswer.value = 0;
    },
    notificationController = (v: string) => {
        const granted = notificationPermsGranted();
        if (granted) {
            // Deleted notification API toaster
            // And only use toaster home-made
            toasterController(v);
        } else {
            toasterController(v);
        }
    },
    toasterController = (v: string) => {
        if (v === 'short') {
            toasterStore.default({ title: 'Take a break', text: 'It is time to take a short break!' });
        } else if (v === 'long') {
            toasterStore.default({ title: 'Take a break', text: 'It is time to take a long break!' });
        } else if (v === 'ended') {
            toasterStore.info({ title: 'Cycle ended', text: 'Work cycle ended' });
        }
    },
    notificationPermsGranted = () => {
        if (!('Notification' in window)) {
            alert('This browser does not support desktop notification');
            return false
        } else if (Notification.permission === 'granted') {
            return true
        } else if (Notification.permission === 'default') {
            Notification.requestPermission().then(perm => {
                if (perm === 'granted') return true
            })
        } else return false
    },
    openTimerMenu = (e: { stopPropagation: () => void; }) => {
        isTimerMenuOpen.value = true
        e.stopPropagation();
    },
    closeTimerMenu = (e: { stopPropagation: () => void; }) => {
        isTimerMenuOpen.value = false
        e.stopPropagation();
    },
    openCyclesMenu = (e: { stopPropagation: () => void; }) => {
        isManualCyclesMenuOpen.value = true
        e.stopPropagation();
    },
    closeCyclesMenu = (e: { stopPropagation: () => void; }) => {
        isManualCyclesMenuOpen.value = false
        e.stopPropagation();
    },
    handleUpdateWork = (value: number) => {
        work.value = value
        changeTimerValue(work.value, '');
    },
    handleUpdateShortBreak = (value: number) => {
        short.value = value
    },
    handleUpdateLongBreak = (value: number) => {
        long.value = value
    };

const formatTime = computed(() => {
    const hours = Math.floor(time.value / 3600), seconds = time.value % 60;
    let minutes;
    if (time.value < 3600) {
        minutes = Math.floor(time.value / 60);
    } else {
        minutes = Math.floor(0);
    }
    return `${hours.toString().padStart(2, '0')}: ${minutes.toString().padStart(2, '0')}: ${seconds.toString().padStart(2, '0')}`
});

onMounted(() => {
    notificationPermsGranted();
});
</script>

<template>
    <div class="flex flex-row justify-end items-center w-full h-auto pt-2">
        <button v-if="(isCyclesAuto == false && manualStartNewCycle == false) && manualCycleAnswer == 2" @click="openCyclesMenu" class="text-lg font-semibold w-max h-auto px-4 border-none bg-transparent relative hover:text-blue-600">
            <font-awesome-icon :icon="['fas', 'circle-exclamation']" class="fa-base text-red-700 absolute bottom-5 left-0.5"></font-awesome-icon>
            {{ capitalize(t('newcycle')) }}?
        </button>
        <button @click="openTimerMenu" class="text-lg font-semibold w-max h-auto px-4 border-none bg-transparent hover:text-blue-600">
            <font-awesome-icon :icon="['fas', 'gear']" class="fa-lg"></font-awesome-icon>
            {{ capitalize(t('settings')) }}
        </button>
    </div>
    <div class="flex flex-col items-center w-full h-auto py-6 border border-solid border-gray-300 rounded-lg">
        <div class="flex justify-center w-full h-auto py-3 border-none gap-2">
            <button @click="changeTimerValue(work, 'work')"
                class="text-lg font-semibold border-none bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                {{ capitalize(t('work')) }}
            </button>
            <button @click="changeTimerValue(short, 'short')"
                class="text-lg font-semibold border-none bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                {{ capitalize(t('short')) }}
            </button>
            <button @click="changeTimerValue(long, 'long')"
                class="text-lg font-semibold border-none bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                {{ capitalize(t('long') )}}
            </button>
        </div>
        <div class="flex flex-col justify-center items-center w-full h-auto py-6 gap-2">
            <div class="text-7xl font-semibold">{{ formatTime }}</div>
            <div class="progress-bar w-3/4 h-5 mx-0 my-auto overflow-hidden">
                <div class="progress" :style="{ width: progressBarWidth }" :class="progressBarColor"></div>
            </div>
            <div class="flex timerbuttons justify-center items-center h-auto gap-4">
                <button @click="startTimer"
                    class="flex justify-center items-center w-1/2 text-3xl font-semibold border-none bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-blue-600">
                    <font-awesome-icon :icon="['fas', 'play']"></font-awesome-icon>
                    <span class="font-semibold mx-6">{{ capitalize(t('start')) }}</span>
                </button>
                <button @click="stopTimer"
                    class="flex justify-center items-center w-1/2 text-3xl font-semibold border-none bg-orange-700 text-white px-6 py-3 rounded-lg hover:bg-blue-600">
                    <font-awesome-icon :icon="['fas', 'play']"></font-awesome-icon>
                    <span class="font-semibold mx-6">{{ capitalize(t('pause')) }}</span>
                </button>
                <button @click="resetTimer"
                    class="flex justify-center items-center w-1/2 text-3xl font-semibold border-none bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-blue-600">
                    <font-awesome-icon :icon="['fas', 'play']"></font-awesome-icon>
                    <span class="font-semibold mx-6">{{ capitalize(t('reset')) }}</span>
                </button>
            </div>
            <div class="flex flex-row justify-center items-center w-full h-auto gap-4">
                <div
                    class="flex justify-center items-center w-auto h-auto mt-3 px-6 py-3 border border-solid border-gray-500 rounded-lg">
                    <p class="text-xl">
                        <span>{{ capitalize(t('cycles')) }}:</span>
                        <span class="font-semibold">{{ cycles }}</span>
                    </p>
                </div>
                <div
                    class="flex justify-center items-center w-auto h-auto mt-3 px-6 py-3 border border-solid border-gray-500 rounded-lg">
                    <p class="text-xl">
                        <span>{{ capitalize(t('cycletype')) }}: </span>
                        <span v-if="isCyclesAuto == true" class="font-semibold">{{ capitalize(t('auto')) }}</span>
                        <span v-else class="font-semibold">{{ capitalize(t('manual')) }}</span>
                    </p>
                </div>
            </div>
        </div>
        <TimerSettingsMenu v-model:is-menu-open="isTimerMenuOpen" v-model:is-cycles-auto="isCyclesAuto"
            v-model:cycles-number="cyclesNumberBeforeLongBreak" :workvalue="work" :shortbreakvalue="short"
            :longbreakvalue="long" @updateworkvalue="handleUpdateWork" @updateshorbreakvalue="handleUpdateShortBreak"
            @updatelongbreakvalue="handleUpdateLongBreak" v-click-outside="closeTimerMenu" />
        <TimerManualCyclesMenu v-model:is-menu-open="isManualCyclesMenuOpen" :cycle-type="cyclesType"
            @new-cycle="startNewCycle" v-click-outside="closeCyclesMenu"></TimerManualCyclesMenu>
        <ToasterTransition />
    </div>
</template>

<style scoped>
.progress-bar {
    background-color: #ddd;
    border-radius: 20px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    transition: width 0.5s ease-in-out;
}

.progress {
    height: 20px;
    border-radius: 20px;
    transition: width 0.5s ease-in-out;
}

.timerbuttons {
    flex-direction: column;
    width: 100%;
}

@media (orientation: landscape) or (min-width: 63rem) {
    .timerbuttons {
        flex-direction: row;
        width: auto;
    }
}
</style>