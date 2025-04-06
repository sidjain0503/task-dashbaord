<template>
  <div class="kanban-container">
    <div class="flex flex-col md:flex-row gap-4 p-4">
      <!-- Pending Column -->
      <div class="kanban-column bg-gray-50 rounded-lg shadow p-4 flex-1 min-h-[500px]">
        <h3 class="text-lg font-semibold mb-4 text-gray-700 flex items-center">
          <span class="w-3 h-3 bg-yellow-400 rounded-full mr-2"></span>
          Pending
          <span class="ml-2 bg-gray-200 text-gray-700 text-xs font-medium px-2 py-0.5 rounded-full">
            {{ pendingTasks.length }}
          </span>
        </h3>
        <div class="space-y-3">
         <KanbanCard v-for="task in pendingTasks" :key="task.id" :task="task" status="pending" @taskUpdated="tasksStore.fetchTasks" @delete="deleteTask"/>
          <div v-if="pendingTasks.length === 0" class="text-center py-8 text-gray-500">
            No pending tasks
          </div>
        </div>
      </div>

      <!-- In Progress Column -->
      <div class="kanban-column bg-gray-50 rounded-lg shadow p-4 flex-1 min-h-[500px]">
        <h3 class="text-lg font-semibold mb-4 text-gray-700 flex items-center">
          <span class="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
          In Progress
          <span class="ml-2 bg-gray-200 text-gray-700 text-xs font-medium px-2 py-0.5 rounded-full">
            {{ inProgressTasks.length }}
          </span>
        </h3>
        <div class="space-y-3">
          <KanbanCard v-for="task in inProgressTasks" :key="task.id" :task="task" status="in_progress" @taskUpdated="tasksStore.fetchTasks" @delete="deleteTask"/>
          <div v-if="inProgressTasks.length === 0" class="text-center py-8 text-gray-500">
            No tasks in progress
          </div>
        </div>
      </div>

      <!-- Completed Column -->
      <div class="kanban-column bg-gray-50 rounded-lg shadow p-4 flex-1 min-h-[500px]">
        <h3 class="text-lg font-semibold mb-4 text-gray-700 flex items-center">
          <span class="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
          Completed
          <span class="ml-2 bg-gray-200 text-gray-700 text-xs font-medium px-2 py-0.5 rounded-full">
            {{ completedTasks.length }}
          </span>
        </h3>
        <div class="space-y-3">
          <KanbanCard v-for="task in completedTasks" :key="task.id" :task="task" status="completed" @taskUpdated="tasksStore.fetchTasks" @delete="deleteTask"/>
          <div v-if="completedTasks.length === 0" class="text-center py-8 text-gray-500">
            No completed tasks
          </div>
        </div>
      </div>
    </div>

  
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import KanbanCard from './KanbanCard.vue';
import useTasksStore from '../../../stores/tasksStore';
const  tasksStore = useTasksStore()


// Computed properties to filter tasks by status
const pendingTasks = computed(() => tasksStore.tasks.filter(task => task.status === 'pending'));
const inProgressTasks = computed(() => tasksStore.tasks.filter(task => task.status === 'in_progress'));
const completedTasks = computed(() => tasksStore.tasks.filter(task => task.status === 'completed'));


const deleteTask = async (id) => {
  await tasksStore.deleteTask(id);
}

// Fetch tasks on component mount

onMounted(tasksStore.fetchTasks);

</script>

<style scoped>
.kanban-container {
  width: 100%;
  overflow-x: auto;
}

@media (max-width: 768px) {
  .kanban-column {
    min-width: 280px;
    margin-bottom: 1rem;
  }
}
</style>
