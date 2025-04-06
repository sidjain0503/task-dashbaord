import { ref } from 'vue'
import { defineStore } from 'pinia'
import api from '../services/apiService'

const useTasksStore = defineStore('tasks', () => {
  const tasks = ref([])
  
  const fetchTasks = async () => {
    try {
      const response = await api.get('/tasks')
      tasks.value = response.data
    } catch (error) {
      console.error('Error fetching tasks:', error)
    }
  }
  
  const updateTask = async (id, updatedTask) => {
    try {
      await api.put(`/tasks/${id}`, updatedTask)
      
      // Update the local state with the provided updatedTask directly
      const index = tasks.value.findIndex(task => task.id === id)
      if (index !== -1) {
        // Create a new object to ensure reactivity
        tasks.value[index] = { ...updatedTask }
        
        // Create a new array to ensure the reactive trigger
        tasks.value = [...tasks.value]
      }
      
      // No need to return the response.data as we're using the updatedTask
      return updatedTask
    } catch (error) {
      console.error('Error updating task:', error)
      throw error
    }
  }

  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`)
      // Immediately update the local state
      tasks.value = tasks.value.filter(task => task.id !== id)
    } catch (error) {
      console.error('Error deleting task:', error)
      throw error
    }
  }

  const createTask = async (task) => {
    try {
      const response = await api.post('/tasks', task)
      tasks.value.push(response.data)
    } catch (error) {
      console.error('Error creating task:', error)
      throw error
    }
  }

  return { tasks, fetchTasks, updateTask, deleteTask, createTask }
})

export default useTasksStore
