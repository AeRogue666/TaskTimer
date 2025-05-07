<script setup lang="ts">
const props = defineProps<{
    task: object | any
}>();
</script>

<template>
    <div v-for="(task,i) of props.task" :key="i"
        class="flex flex-row justify-center items-center w-auto h-auto min-w-36 min-h-12 p-1" :class="`text-${task.color}-600`">
        <font-awesome-icon :icon="['fas', task.icon]" class="fa-lg mx-2"></font-awesome-icon>
        <p class="text-base font-semibold">{{ task.title }}</p>
    </div>
</template>

<style scoped></style>