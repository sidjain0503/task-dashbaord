/*
Learning Notes:

🏗️ What is a "Store"?
A store in Pinia is like a mini-module that holds:

🧠 state: Reactive data

🧮 getters: Computed properties (like isLoggedIn)

🧰 actions: Functions that update the state (like login)

*/
import { defineStore } from 'pinia'
import apiService from '../services/apiService'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || ''
  }),

  getters: {
    isLoggedIn: (state) => !!state.token,
    isAdmin: (state) => state.user?.role === 'admin'
  },

  actions: {
    async login(email, password) {
      try {
        const res = await apiService.post('/auth/login', { email, password })
        this.token = res.data.token
        localStorage.setItem('token', this.token)
        await this.fetchProfile()
      } catch (err) {
        throw err
      }
    },

    async register(name, email, password) {
      try {
        await apiService.post('/auth/register', { name, email, password })
        // Optional: auto-login after register
        await this.login(email, password)
      } catch (err) {
        throw err
      }
    },

    async fetchProfile() {
      try {
        const res = await apiService.get('/auth/profile')
        this.user = res.data
      } catch (err) {
        this.logout() // Token expired or invalid
      }
    },

    logout() {
      this.token = ''
      this.user = null
      localStorage.removeItem('token')
    }
  }
})
