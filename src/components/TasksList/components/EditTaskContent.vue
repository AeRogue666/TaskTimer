<script setup lang="ts">
import { capitalize, ref, watchEffect } from 'vue'
import TaskItem from '../ui/AddTaskItem.vue'
import SelectStatus from './SelectStatus.vue'
import MenuOpacity from '@/components/ui/MenuOpacity.vue';
import { useI18n } from 'petite-vue-i18n';

const props = defineProps<{
    taskname: string
    taskid: number | undefined
    resultValue?: number | undefined
    status: string
  }>(),
  emits = defineEmits<{
    updatetaskname: [value: string]
    updatestatus: [value: string]
    deletetask: [value: boolean]
  }>()
const isMenuOpen = defineModel('isMenuOpen'),
  taskName = ref<string>(props.taskname),
  status = ref<string>(props.status),
  error = ref<string>('')
const { t } = useI18n({});

const submitNewValues = () => {
    if (typeof taskName.value !== undefined && taskName.value.length !== 0) {
      emits('updatetaskname', taskName.value)
    } else error.value = 'A task need a name!'
  },
  submitNewStatus = () => {
    emits('updatestatus', status.value)
  },
  deleteTask = () => {
    emits('deletetask', true)
    closeMenu()
  },
  closeMenu = () => {
    isMenuOpen.value = false
  }

watchEffect(() => {
  if (props.resultValue == 2) {
    error.value = 'This name is already used!'
  } else if (props.resultValue == 3) {
    closeMenu()
  }
  console.log(props.resultValue)
})
</script>

<template>
  <div
    class="flex flex-col justify-center items-center w-1/2 h-auto min-w-36 min-h-96 py-6 px-3 task border border-solid border-gray-500 rounded-xl absolute top-96 z-50"
    :key="props.taskid"
  >
    <TaskItem>
      <template #heading>
        <h2 class="text-3xl font-semibold mb-auto">{{ capitalize(t('edittask_title')) }}</h2>
        <button
          @click.prevent="closeMenu"
          class="flex border-none text-gray-500 rounded-lg absolute top-3 right-3 hover:text-blue-600"
        >
          <font-awesome-icon :icon="['fas', 'xmark']" class="fa-xl"></font-awesome-icon>
        </button>
      </template>
      <template #label>
        <label for="edittask" class="text-lg font-semibold">{{ capitalize(t('edittask_name')) }}</label>
      </template>
      <template #input>
        <input
          v-model="taskName"
          @keypress.enter.prevent="submitNewValues"
          id="edittask"
          name="edittask"
          class="w-1/2 h-12 text-base mt-2 px-4 py-2 text-black border border-solid border-gray-500 rounded-lg"
          :placeholder="capitalize(t('edittask_placeholder'))"
        />
      </template>
      <div v-if="error">
        <p class="text-xl font-semibold text-red-600">{{ error }}</p>
      </div>
      <div class="flex flex-col items-center w-full h-full mt-12 mb-auto">
        <p class="text-lg font-semibold">{{ capitalize(t('edittask_status')) }}</p>
        <div class="flex flex-col justify-center items-center w-full h-full">
          <SelectStatus v-model:status-code="status"></SelectStatus>
          <button
            v-if="status"
            @click.prevent="submitNewStatus"
            class="inline-flex justify-center items-center w-1/2 h-12 my-6 mx-3 px-2 bg-green-700 text-2xl font-semibold text-white hover:bg-blue-600 border-none rounded-xl"
          >
          <font-awesome-icon :icon="['fas','check']" class="fa-lg px-2"></font-awesome-icon>
            {{ capitalize(t('edittask_status_btn')) }}
          </button>
        </div>
      </div>
      <div class="flex flex-row justify-center items-center w-full h-full mt-12 mb-4 gap-4">
        <button
          @click.prevent="submitNewValues"
          type="button"
          class="taskbtn inline-flex justify-center items-center w-1/2 h-16 mt-6 mb-auto px-4 py-2 bg-green-700 text-2xl font-semibold text-white hover:bg-blue-600 border-none rounded-xl"
        >
        <font-awesome-icon :icon="['fas','check']" class="fa-lg px-2"></font-awesome-icon>
          {{ capitalize(t('edittask_change_title_btn')) }}
        </button>
        <button
          @click.prevent="deleteTask"
          type="button"
          class="taskbtn inline-flex justify-center items-center w-1/2 h-16 mt-6 mb-auto px-4 py-2 bg-red-700 text-2xl font-semibold text-white hover:bg-blue-600 border-none rounded-xl"
        >
        <font-awesome-icon :icon="['fas','trash-can']" class="fa-lg px-2"></font-awesome-icon>
          {{ capitalize(t('edittask_delete_btn')) }}
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

.taskbtn {
  width: 50%;
}

@media (orientation: landscape) or (min-width: 63rem) {
  .taskbtn {
    width: 33.3%;
  }
}
</style>