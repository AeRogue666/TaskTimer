<script setup lang="ts">
import { computed, ref } from 'vue';

const props = defineProps({
    timevalue: Number,
});

const time = ref<any>(props.timevalue), isRunning = ref<boolean>(false), progressBarWidth = ref<string>('100%');
let timer: number | undefined;
const formatTime = computed(() => {
    const hours = Math.floor(time.value / 3600), seconds = time.value % 60;
    let minutes;
    if(time.value < 3600) {
        minutes = Math.floor(time.value / 60);
    } else {
        minutes = Math.floor(0);
    }
    return `${hours.toString().padStart(2, '0')}: ${minutes.toString().padStart(2, '0')}: ${seconds.toString().padStart(2, '0')}`
});

const startTimer = () => {
    isRunning.value = true;
    timer = setInterval(() => {
        if (time.value > 0) {
            time.value--;
            progressBarWidth.value = `${(time.value / 1500) * 100}%`
        } else {
            stopTimer();
            console.log('Time is up!');
        }
    }, 1000);
},
    stopTimer = () => {
        clearInterval(timer);
        isRunning.value = false;
    },
    resetTimer = () => {
        stopTimer();
        time.value = 3600;
        progressBarWidth.value = '100%';
    };
</script>

<template>
    <div class="container">
        <div class="brand">Pomodoro Timer</div>
        <div class="timer">{{ formatTime }}</div>
        <div class="progress-bar">
            <div class="progress" :style="{ width: progressBarWidth }"></div>
        </div>
        <button @click="startTimer" :disabled="isRunning" class="btntimer">Start</button>
        <button @click="stopTimer" :disabled="!isRunning" class="btntimer pause-button">Pause</button>
        <button @click="resetTimer" class="btntimer reset-button">Reset</button>
    </div>
</template>

<style lang="css">
.container {
    text-align: center;
    border: 2px solid #4CAF50;
    border-radius: 20px;
    padding: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-color: #fff;
}

.timer {
    font-size: 4rem;
    margin-bottom: 20px;
    color: #4CAF50;
}

.progress-bar {
    width: 70%;
    background-color: #ddd;
    border-radius: 20px;
    overflow: hidden;
    margin: 0 auto;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.progress-bar .progress {
    background-color: #4CAF50;
    height: 20px;
    border-radius: 20px;
    transition: width 0.5s ease-in-out;
}

.btntimer {
    font-size: 1.5rem;
    padding: 10px 20px;
    margin: 20px;
    border: none;
    background-color: #4CAF50;
    color: #fff;
    cursor: pointer;
    border-radius: 5px;
    transition: background-color 0.3s ease;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.btntimer:hover {
    background-color: #45a049;
}

.brand {
    font-size: 2rem;
    color: #4CAF50;
}

.reset-button {
    background-color: #ff5252;
}

.pause-button {
    background-color: #ffd600;
}
</style>