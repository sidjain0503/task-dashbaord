import { defineStore } from 'pinia'

export const useViewStore = defineStore('view', {
  state: () => ({
    currentView: 'kanban'
  }),
  actions: {
    setCurrentView(view) {
      this.currentView = view
    }
  }
})

export default useViewStore