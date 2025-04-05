<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-500 to-teal-600 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full bg-white rounded-xl shadow-2xl overflow-hidden p-8 space-y-8">
      <div class="text-center">
        <h2 class="text-3xl font-extrabold text-gray-900 tracking-tight">Create an Account</h2>
        <p class="mt-2 text-sm text-gray-600">Join our community today</p>
      </div>
      <form @submit.prevent="handleRegister" class="space-y-6">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="name" class="sr-only">Full name</label>
            <input v-model="name" id="name" name="name" type="text" required 
              class="appearance-none rounded-t-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm" 
              placeholder="Full name" />
          </div>
          <div>
            <label for="email" class="sr-only">Email address</label>
            <input v-model="email" id="email" name="email" type="email" required 
              class="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm" 
              placeholder="Email address" />
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input v-model="password" id="password" name="password" type="password" required 
              class="appearance-none rounded-b-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm" 
              placeholder="Password" />
          </div>
        </div>

        <div>
          <button type="submit" 
            class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors duration-200">
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <svg class="h-5 w-5 text-teal-500 group-hover:text-teal-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
              </svg>
            </span>
            Create Account
          </button>
        </div>
        <div v-if="error" class="text-red-500 text-center">{{ errorMessage }}</div>
      </form>
      <div class="text-center text-sm">
        <router-link to="/login" class="font-medium text-teal-600 hover:text-teal-500">
          Already have an account? Sign in
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'

const name = ref('')
const email = ref('')
const password = ref('')
const router = useRouter()
const auth = useAuthStore()
const error = ref(false)
const errorMessage = ref('')

const handleRegister = async () => {
  try {
    await auth.register(name.value, email.value, password.value)
    router.push('/dashboard')
  } catch (err) {
    error.value = true
    errorMessage.value = 'Registration failed. This email might already be in use.'
  }
}
</script>
