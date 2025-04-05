<template>
  <div class="bg-white border-b border-gray-200 px-3 mb-6 flex justify-between items-center">
    <div class="flex space-x-4 px-4 py-3">
    <div 
        @click="setView('kanban')" 
        class="px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-100 cursor-pointer"
        :class="{ 'bg-blue-100 text-blue-800': currentView === 'kanban' }"
      >
        <div class="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
          </svg>
          Kanban
        </div>
      </div>

      <div 
        @click="setView('list')" 
        class="px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-100 cursor-pointer"
        :class="{ 'bg-blue-100 text-blue-800': currentView === 'list' }"
      >
        <div class="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
          </svg>
          List
        </div>
    </div>
      
     
    </div>
    <CreateTasks @taskCreated="fetchTasks" />
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import CreateTasks from '../tasks/tasksaction/CreateTasks.vue'

defineProps({
  currentView: String,
  setView: Function
})

const emit = defineEmits(['setView'])

const setView = (view) => {
  emit('setView', view)
}

</script>