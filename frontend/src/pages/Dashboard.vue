<template>
  <div class="min-h-screen bg-gray-50 flex">
    <Sidebar />
    <div class="flex-1 mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Welcome, {{ auth.user.name }}</h1>
        <p class="text-gray-600 mt-2">Manage and track your tasks efficiently</p>
      </div>
      
      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
          <h3 class="text-lg font-medium text-gray-900">Total Tasks</h3>
          <p class="text-3xl font-bold mt-2">{{ tasks.length }}</p>
        </div>
        <div class="bg-white rounded-lg shadow p-6 border-l-4 border-yellow-500">
          <h3 class="text-lg font-medium text-gray-900">In Progress</h3>
          <p class="text-3xl font-bold mt-2">{{ tasks.filter(t => t.status === 'in_progress').length }}</p>
        </div>
        <div class="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
          <h3 class="text-lg font-medium text-gray-900">Completed</h3>
          <p class="text-3xl font-bold mt-2">{{ tasks.filter(t => t.status === 'completed').length }}</p>
        </div>
      </div>
      
      <Viewnav :currentView="currentView" @setView="setView" />
      <KanbanView v-if="currentView === 'kanban'" />
      <ListView v-if="currentView === 'list'" />
      
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import Sidebar from '../components/sidebar/Sidebar.vue'
import KanbanView from '../components/tasks/taskview/KanbanView.vue'
import Viewnav from '../components/viewnav/Viewnav.vue'
import ListView from '../components/tasks/taskview/ListView.vue'
import useViewStore from '../stores/viewStore'
import useTasksStore from '../stores/tasksStore'
import { useAuthStore } from '../stores/authStore'

const tasksStore = useTasksStore()
const view = useViewStore()
const auth = useAuthStore()

const tasks = computed(() => tasksStore.tasks)
const currentView = computed(() => view.currentView)

const setView = (key) => {
  view.setCurrentView(key)
}

onMounted(async () => {
  await tasksStore.fetchTasks()
})
</script>

