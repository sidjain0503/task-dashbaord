import { defineStore } from 'pinia'
import api from '../services/apiService'

export const useTasksStore = defineStore('tasks', {
  state: () => ({
    tasks: [],
    loading: false,
    error: null
  }),
  actions: {
    async fetchTasks() {
      this.loading = true
      try {
        const response = await api.get('/tasks')
        this.tasks = response.data
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },
    async createTask(task) {
      try {
        const response = await api.post('/tasks', task)
        this.tasks.push(response.data)
      } catch (error) {
        this.error = error.message
      }
    },
    async updateTask(id, task) {
      try {
        const response = await api.put(`/tasks/${id}`, task)
        const index = this.tasks.findIndex(t => t.id === id)
        if (index !== -1) {
          this.tasks[index] = response.data
        }
      } catch (error) {
        this.error = error.message
      }
    },
    async deleteTask(id) {
      try {
        await api.delete(`/tasks/${id}`)
        this.tasks = this.tasks.filter(t => t.id !== id)
      } catch (error) {
        this.error = error.message
      }
    }
  }
})

export default useTasksStore
