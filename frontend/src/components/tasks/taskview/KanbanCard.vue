<template>
  <div 
    class="bg-white p-4 rounded-lg shadow border-l-4 cursor-pointer hover:shadow-md transition-shadow"
    :class="borderColorClass"
    @click="$emit('edit', task)"
  >
    <h4 class="font-medium text-gray-900">{{ task.title }}</h4>
    <p class="text-gray-600 text-sm mt-2 line-clamp-2">{{ task.description }}</p>
    
    <div class="flex justify-between items-center mt-4">
      <div class="flex space-x-1">
        <span 
          class="px-2 py-1 text-xs rounded-full font-medium"
          :class="statusBadgeClass"
        >
          {{ statusLabel }}
        </span>
        <span v-if="task.priority" class="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800 font-medium">
          {{ task.priority }}
        </span>
      </div>
      <div class="text-xs text-gray-500">
        {{ formatDate(task.due_date) }}
      </div>
    </div>
    
    <div class="flex justify-between items-center mt-3 pt-3 border-t border-gray-100">
      <div class="flex space-x-2">
        <button 
          v-if="status !== 'pending'" 
          @click.stop="updateTaskStatus('pending')" 
          class="p-1 rounded-full hover:bg-yellow-50 text-yellow-600 hover:text-yellow-800 transition-colors"
          title="Move to Pending"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
        <button 
          v-if="status !== 'in_progress'" 
          @click.stop="updateTaskStatus('in_progress')" 
          class="p-1 rounded-full hover:bg-blue-50 text-blue-600 hover:text-blue-800 transition-colors"
          title="Move to In Progress"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </button>
        <button 
          v-if="status !== 'completed'" 
          @click.stop="updateTaskStatus('completed')" 
          class="p-1 rounded-full hover:bg-green-50 text-green-600 hover:text-green-800 transition-colors"
          title="Mark as Completed"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        </button>
      </div>
      <div class="flex space-x-2">
        <EditTasks :task="task" @taskUpdated="$emit('taskUpdated')" />
        <button 
          @click.stop="$emit('delete', task.id)" 
          class="p-1 rounded-full hover:bg-red-50 text-red-600 hover:text-red-800 transition-colors"
          title="Delete Task"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import EditTasks from '../tasksaction/EditTasks.vue';
import useTasksStore from '../../../stores/tasksStore';

const tasksStore = useTasksStore();

const props = defineProps({
  task: {
    type: Object,
    required: true
  },
  status: {
    type: String,
    required: true,
    validator: (value) => ['pending', 'in_progress', 'completed'].includes(value)
  }
});

const emit = defineEmits(['edit', 'delete', 'taskUpdated']);

const borderColorClass = computed(() => {
  switch (props.status) {
    case 'pending':
      return 'border-yellow-400';
    case 'in_progress':
      return 'border-blue-500';
    case 'completed':
      return 'border-green-500';
    default:
      return 'border-gray-300';
  }
});

const statusBadgeClass = computed(() => {
  switch (props.status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'in_progress':
      return 'bg-blue-100 text-blue-800';
    case 'completed':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
});

const statusLabel = computed(() => {
  switch (props.status) {
    case 'pending':
      return 'Pending';
    case 'in_progress':
      return 'In Progress';
    case 'completed':
      return 'Completed';
    default:
      return props.status;
  }
});

const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric',
    year: 'numeric'
  });
};


const updateTaskStatus = async (newStatus) => {
  try {
    await tasksStore.updateTask(props.task.id, { ...props.task, status: newStatus });
    emit('taskUpdated');
    
  } catch (error) {
    console.error('Error updating task status:', error);
  }
};
</script>