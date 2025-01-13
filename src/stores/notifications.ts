import { acceptHMRUpdate, defineStore } from 'pinia'

export const NotificationsStore = defineStore('notificationsStore', {
  state: () => {
    return {
      notifications: [],
      errors: [],
    }
  },

  actions: {
    addNotification(message: string, duration: number) {
      this.notifications.push({ message })
      setTimeout(() => {
        this.notifications = this.notifications.filter((notif) => notif.message !== message)
      }, duration || 6000)
    },
    addError(message: string, duration: number) {
      this.errors.push({ message })
      setTimeout(() => {
        this.errors = this.errors.filter((notif) => notif.message !== message)
      }, duration || 6000)
    },
    deleteNotification(notification) {
      this.notifications = this.notifications.filter(
        (notif) => notif.message !== notification.message,
      )
    },
  },

  getters: {
    // getTags: state => state.tags
  },
})

if (import.meta.hot) import.meta.hot.accept(acceptHMRUpdate(NotificationsStore, import.meta.hot))
