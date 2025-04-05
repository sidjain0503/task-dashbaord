<template>
  <div>
    <!-- Edit Task Button Trigger -->
    <button
      type="button"
      @click="openEditModal"
      class="text-blue-600 hover:text-blue-900"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    </button>

    <TransitionRoot appear :show="isOpen" as="template">
      <Dialog as="div" @close="closeEditModal" class="relative z-10">
        <TransitionChild
          as="template"
          enter="ease-in-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in-out duration-300"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>

        <div class="fixed inset-0 overflow-hidden">
          <div class="absolute inset-0 overflow-hidden">
            <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <TransitionChild
                as="template"
                enter="transform transition ease-in-out duration-300"
                enter-from="translate-x-full"
                enter-to="translate-x-0"
                leave="transform transition ease-in-out duration-300"
                leave-from="translate-x-0"
                leave-to="translate-x-full"
              >
                <DialogPanel class="pointer-events-auto w-screen" style="max-width: 30vw;">
                  <div class="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div class="px-4 py-6 sm:px-6">
                      <div class="flex items-start justify-between">
                        <DialogTitle class="text-lg font-medium text-gray-900">
                          Edit Task
                        </DialogTitle>
                        <div class="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            class="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            @click="closeEditModal"
                          >
                            <span class="sr-only">Close panel</span>
                            <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div class="relative flex-1 px-4 sm:px-6">
                      <!-- Task edit form -->
                      <form @submit.prevent="updateTask" class="space-y-6">
                        <div>
                          <label for="title" class="block text-sm font-medium text-gray-700">Task Title</label>
                          <input
                            type="text"
                            id="title"
                            v-model="editingTask.title"
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            placeholder="Enter task title"
                            required
                          />
                        </div>
                        
                        <div>
                          <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
                          <textarea
                            id="description"
                            v-model="editingTask.description"
                            rows="4"
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            placeholder="Enter task description"
                          ></textarea>
                        </div>
                        
                        <div>
                          <label for="status" class="block text-sm font-medium text-gray-700">Status</label>
                          <select
                            id="status"
                            v-model="editingTask.status"
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                          >
                            <option value="pending">Pending</option>
                            <option value="in_progress">In Progress</option>
                            <option value="completed">Completed</option>
                          </select>
                        </div>
                        
                        <div class="flex justify-end space-x-3 pt-5">
                          <button
                            type="button"
                            class="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            @click="closeEditModal"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            class="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                          >
                            Update
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue';
import useTasksStore from '../../../stores/tasksStore';

const props = defineProps({
  task: {
    type: Object,
    required: false,
    default: () => ({})
  }
});

const emit = defineEmits(['taskUpdated']);
const tasksStore = useTasksStore();
const isOpen = ref(false);
const editingTask = ref({ ...props.task });

const openEditModal = () => {
  editingTask.value = { ...props.task };
  isOpen.value = true;
};

const closeEditModal = () => {
  isOpen.value = false;
};

const updateTask = async () => {
  try {
    await tasksStore.updateTask(editingTask.value.id, editingTask.value);
    emit('taskUpdated');
    closeEditModal();
  } catch (error) {
    console.error('Error updating task:', error);
  }
};
</script>


