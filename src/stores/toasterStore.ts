import { defineStore } from 'pinia'

// Toaster status
export type ToastStatus = 'default' | 'info' | 'success' | 'warning' | 'error'

// Definition of the toaster
interface Toast {
  title: string
  text: string
  status: ToastStatus
  id: number
}

// Payload
type ToastPayload = {
  timeout?: number
  text: string
  title: string
}

// time out default timer | Default : 5s
const defaultTimeOut = 5000

// Arrowed function to create a toast
const createToast = (title: string, text: string, status: ToastStatus): Toast => ({
  title,
  text,
  status,
  id: Math.random() * 1000,
})

// Pinia store for toasts
export const useToasterStore = defineStore('toaster-store', {
  state: (): { toasts: Toast[] } => ({
    toasts: [],
  }),
  actions: {
    updateState(payload: ToastPayload, status: ToastStatus) {
      const { title, text, timeout } = payload

      const toast = createToast(title, text, status)

      this.toasts.push(toast)

      setTimeout(() => {
        this.toasts = this.toasts.filter((t) => t.id !== toast.id)
      }, timeout ?? defaultTimeOut)
    },
    default(payload: ToastPayload) {
      this.updateState(payload, 'default')
    },
    info(payload: ToastPayload) {
      this.updateState(payload, 'info')
    },
    success(payload: ToastPayload) {
      this.updateState(payload, 'success')
    },
    warning(payload: ToastPayload) {
      this.updateState(payload, 'warning')
    },
    error(payload: ToastPayload) {
      this.updateState(payload, 'error')
    },
  },
})
