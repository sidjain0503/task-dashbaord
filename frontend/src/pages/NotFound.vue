<template>
  <div class="flex flex-col items-center justify-center min-h-screen px-4 py-12 bg-gray-50">
    <div class="text-center">
      <h1 class="text-9xl font-bold text-gray-300">404</h1>
      <h2 class="mt-4 text-3xl font-bold tracking-tight text-gray-900">Page not found</h2>
      <p class="mt-2 text-base text-gray-500">Sorry, we couldn't find the page you're looking for.</p>
      <div class="mt-6">
        <router-link to="/" class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Go back home
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
// No additional logic needed for this page
</script>
