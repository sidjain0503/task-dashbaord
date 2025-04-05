<template>
     <!-- Task List -->
     <div class="bg-white rounded-lg shadow">
        <div class="p-6">
          
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="task in tasks" :key="task.id" class="hover:bg-gray-50">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm font-medium text-gray-900">{{ task.title }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <select 
                      v-model="task.status" 
                      @change="quickUpdateStatus(task)"
                      class="text-sm rounded-full px-3 py-1"
                      :class="{
                        'bg-yellow-100 text-yellow-800': task.status === 'pending',
                        'bg-blue-100 text-blue-800': task.status === 'in_progress',
                        'bg-green-100 text-green-800': task.status === 'completed'
                      }"
                    >
                      <option value="pending">Pending</option>
                      <option value="in_progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div class="flex gap-2">
                      <button class="text-blue-600 hover:text-blue-900" @click="editTask(task)">Edit</button>
                      <button class="text-red-600 hover:text-red-900" @click="deleteTask(task.id)">Delete</button>
                    </div>
                  </td>
                </tr>
                <tr v-if="tasks.length === 0">
                  <td colspan="3" class="px-6 py-4 text-center text-gray-500">
                    No tasks found. Add a new task to get started!
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      <!-- Edit Modal -->
      <div v-if="editing" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div class="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
          <h4 class="text-xl font-bold mb-4">Edit Task</h4>
          <form @submit.prevent="updateTask">
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="title">
                Task Title
              </label>
              <input 
                id="title"
                v-model="editing.title" 
                type="text" 
                class="input w-full focus:ring-blue-500 focus:border-blue-500" 
              />
            </div>
            <div class="mb-6">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="status">
                Status
              </label>
              <select 
                id="status"
                v-model="editing.status" 
                class="input w-full focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div class="flex justify-end gap-2">
              <button type="button" class="btn-secondary" @click="editing = null">Cancel</button>
              <button type="submit" class="btn-primary">Update Task</button>
            </div>
          </form>
        </div>
      </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../../../services/apiService'

const tasks = ref([])
const newTask = ref({ title: '' })
const editing = ref(null)

const fetchTasks = async () => {
  const res = await api.get('/tasks')
  tasks.value = res.data
}

const createTask = async () => {
  if (!newTask.value.title) return
  await api.post('/tasks', newTask.value)
  newTask.value.title = ''
  fetchTasks()
}

const editTask = (task) => {
  editing.value = { ...task } // clone to avoid binding issues
}

const updateTask = async () => {
  await api.put(`/tasks/${editing.value.id}`, editing.value)
  editing.value = null
  fetchTasks()
}

const deleteTask = async (id) => {
  await api.delete(`/tasks/${id}`)
  fetchTasks()
}

const quickUpdateStatus = async (task) => {
  await api.put(`/tasks/${task.id}`, { status: task.status })
  fetchTasks()
}

onMounted(fetchTasks)
</script>

<style scoped>
.input {
  @apply border px-3 py-2 rounded w-full;
}
.btn-primary {
  @apply bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors;
}
.btn-secondary {
  @apply bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition-colors;
}
</style>