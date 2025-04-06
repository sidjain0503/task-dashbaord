<template>
  <div class="w-full flex">
  <Sidebar/>

  <div class="container px-10 py-6  mx-auto">
      <h1 class="text-3xl font-bold text-gray-800 mb-8">Welcome {{ auth.user.name }}</h1>

      
      <div v-if="loading" class="bg-white p-8 rounded-lg shadow-md text-center">
          <div class="flex justify-center">
              <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
            </div>
            <p class="mt-4 text-gray-600">Loading user data...</p>
        </div>
        
        <div v-else-if="error" class="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg">
            <p>{{ error }}</p>
        </div>
        
        <div v-else class="bg-white rounded-lg shadow-lg overflow-hidden">
            <div class="px-6 py-4 bg-indigo-600 text-white">
                <h2 class="text-xl font-semibold">User Management</h2>
            </div>
            
            <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                        <tr>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                        <tr v-for="user in users" :key="user.id" :class="{ 'bg-gray-50': !user.is_active }">
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ user.id }}</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ user.name }}</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ user.email }}</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <span v-if="user.role === 'admin'" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-100 text-indigo-800">
                                    Admin
                                </span>
                                <span v-else class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                                    User
                                </span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <span v-if="user.is_active" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                    Active
                                </span>
                                <span v-else class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                    Inactive
                                </span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                <button 
                                v-if="user.role !== 'admin'" 
                                @click="promoteUser(user.id)" 
                                class="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition"
                                >
                                Promote
                            </button>
                            <button 
                            @click="toggleUserStatus(user.id)" 
                            :class="user.is_active 
                    ? 'inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition' 
                    : 'inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition'"
                >
                {{ user.is_active ? 'Deactivate' : 'Activate' }}
            </button>
        </td>
    </tr>
</tbody>
</table>
</div>
</div>
</div>
</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import adminServices from '../services/adminServices';
import Sidebar from '../components/sidebar/Sidebar.vue';
import { useAuthStore } from '../stores/authStore';
const auth = useAuthStore();

const users = ref([]);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  try {
    users.value = await adminServices.getAllUsers();
  } catch (err) {
    error.value = 'Failed to load users: ' + (err.response?.data?.message || err.message);
  } finally {
    loading.value = false;
  }
});

const promoteUser = async (userId) => {
  try {
    loading.value = true;
    await adminServices.promoteUser(userId);
    // Update the user in the list
    const index = users.value.findIndex(user => user.id === userId);
    if (index !== -1) {
      users.value[index].role = 'admin';
    }
  } catch (err) {
    error.value = 'Failed to promote user: ' + (err.response?.data?.message || err.message);
  } finally {
    loading.value = false;
  }
};

const toggleUserStatus = async (userId) => {
  try {
    loading.value = true;
    await adminServices.toggleUserStatus(userId);
    // Update the user status in the list
    const index = users.value.findIndex(user => user.id === userId);
    if (index !== -1) {
      users.value[index].is_active = !users.value[index].is_active;
    }
  } catch (err) {
    error.value = 'Failed to toggle user status: ' + (err.response?.data?.message || err.message);
  } finally {
    loading.value = false;
  }
};
</script>

