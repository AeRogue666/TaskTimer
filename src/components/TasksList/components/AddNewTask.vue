<script setup lang="ts">
import { capitalize, onUpdated, ref } from 'vue'
import TaskItem from '../ui/AddTaskItem.vue'
import MenuOpacity from '@/components/ui/MenuOpacity.vue';
import { useI18n } from 'petite-vue-i18n';

const props = defineProps<{
  resultValue: number
}>(),
  emits = defineEmits<{
    taskName: [value: string]
  }>()

const isMenuOpen = defineModel('isMenuOpen'),
  taskName = ref(''),
  error = ref('');

const { t } = useI18n({});

function closeMenu() {
  isMenuOpen.value = false
}

const submitNewTaskValues = () => {
  if (typeof taskName.value !== undefined && taskName.value.length !== 0)
    emits('taskName', taskName.value)
  else error.value = 'A task need a name!'
}

onUpdated(() => {
  if (props.resultValue == 1) {
    closeMenu()
  } else if (props.resultValue == 2) {
    error.value = 'This task already exist!'
  }
})
</script>

<template>
  <div
    class="flex flex-col justify-center items-center w-1/2 h-auto min-w-36 min-h-96 py-6 px-3 task border border-solid border-gray-500 rounded-xl absolute top-96 z-50">
    <TaskItem>
      <template #heading>
        <h2 class="text-3xl font-semibold mb-auto">{{ capitalize(t('addtask_title')) }}</h2>
        <button @click.prevent="closeMenu"
          class="flex border-none text-gray-500 rounded-lg absolute top-3 right-3 hover:text-blue-600">
          <font-awesome-icon :icon="['fas', 'xmark']" class="fa-xl"></font-awesome-icon>
        </button>
      </template>
      <template #label>
        <label for="addtask" class="text-lg font-semibold">{{ capitalize(t('addtask_name')) }}</label>
      </template>
      <template #input>
        <input v-model="taskName" @keypress.enter.prevent="submitNewTaskValues" id="addtask" name="addtask"
          class="w-1/2 h-12 text-base px-4 py-2 text-black border border-solid border-gray-500 rounded-lg"
          :placeholder="capitalize(t('addtask_placeholder'))" />
      </template>
      <div v-if="error">
        <p class="text-xl font-semibold text-red-600">{{ error }}</p>
      </div>
      <div class="flex flex-col justify-center items-center w-full h-auto mb-4">
        <button @click.prevent="submitNewTaskValues" type="button"
          class="inline-flex justify-center items-center w-1/2 h-16 mt-6 px-4 py-2 bg-green-700 text-2xl font-semibold text-white hover:bg-blue-600 border-none rounded-xl mb-auto">
          <font-awesome-icon :icon="['fas', 'check']" class="fa-lg px-2"></font-awesome-icon>
          {{ capitalize(t('validate')) }}
        </button>
      </div>
    </TaskItem>
  </div>
  <MenuOpacity />
</template>

<style scoped>
.task {
  background-color: var(--color-background);
}
</style>