<template>
  <div class="flex h-screen">
    <!-- Sidebar for desktop -->
    <div class="hidden md:flex md:flex-col md:w-64 md:fixed md:inset-y-0 bg-gray-800">
      <div class="flex items-center justify-center h-16 bg-gray-900">
        <h1 class="text-white font-bold text-xl">Task Dashboard</h1>
      </div>
      <div class="flex-1 flex flex-col overflow-y-auto pt-5 pb-4">
        <nav class="mt-5 flex-1 px-2 space-y-1">
          <router-link to="/dashboard" class="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-white hover:bg-gray-700">
            <svg class="mr-3 h-6 w-6 text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Dashboard
          </router-link>
          
          <router-link to="/tasks" class="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-white hover:bg-gray-700">
            <svg class="mr-3 h-6 w-6 text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Tasks
          </router-link>
          
          <router-link to="/profile" class="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-white hover:bg-gray-700">
            <svg class="mr-3 h-6 w-6 text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Profile
          </router-link>
        </nav>
      </div>
      <div class="flex-shrink-0 flex border-t border-gray-700 p-4">
        <button @click="logout" class="flex-shrink-0 group block w-full">
          <div class="flex items-center">
            <div>
              <svg class="h-8 w-8 text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </div>
            <div class="ml-3">
              <p class="text-sm font-medium text-white">Logout</p>
            </div>
          </div>
        </button>
      </div>
    </div>

    <!-- Mobile menu -->
    <div class="md:hidden">
      <Disclosure as="nav" class="bg-gray-800">
        <div class="px-2 mx-2">
          <div class="flex items-center justify-between h-16">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <h1 class="text-white font-bold">Task Dashboard</h1>
              </div>
            </div>
            <DisclosureButton class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span class="sr-only">Open main menu</span>
              <MenuIcon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
              <XIcon v-else class="block h-6 w-6" aria-hidden="true" />
            </DisclosureButton>
          </div>
        </div>

        <DisclosurePanel class="px-2 pt-2 pb-3 space-y-1">
          <DisclosureButton as="div">
            <router-link to="/dashboard" class="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700">Dashboard</router-link>
          </DisclosureButton>
          <DisclosureButton as="div">
            <router-link to="/tasks" class="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700">Tasks</router-link>
          </DisclosureButton>
          <DisclosureButton as="div">
            <router-link to="/profile" class="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700">Profile</router-link>
          </DisclosureButton>
          <DisclosureButton as="div">
            <button @click="logout" class="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700">Logout</button>
          </DisclosureButton>
        </DisclosurePanel>
      </Disclosure>
    </div>

    <!-- Main content -->
    <div class="md:pl-64 flex flex-col flex-1">
      <slot></slot>
    </div>
  </div>
</template>