<script setup lang="ts">
import HomePomodoroTimer from '@/components/PomodoroTimer/PomodoroTimer.vue';
import HomeTasksList from '@/components/TasksList/TasksList.vue';

</script>

<template>
  <div class="flex flex-col justify-center items-center w-full h-full gap-4">
    <HomePomodoroTimer></HomePomodoroTimer>
    <HomeTasksList></HomeTasksList>
  </div>
</template>

<style lang="css" scoped></style>