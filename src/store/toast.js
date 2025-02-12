import { defineStore } from "pinia";

const defaultTimeout = 2000;

const createToast = (text, status) => ({
  text,
  status,
  id: Math.random() * 1000,
});

export default defineStore("toaster-store", {
  state: () => ({
    toasts: [],
  }),
  actions: {
    updateState(payload, status) {
      const { text, timeout } = payload;

      const toast = createToast(text, status);

      this.toasts.push(toast);

      setTimeout(() => {
        this.toasts = this.toasts.filter((t) => t.id !== toast.id);
      }, timeout || defaultTimeout);

      return toast.id;
    },
    success(payload) {
      const toastId = this.updateState(payload, "success");
      return toastId;
    },

    warning(payload) {
      const toastId = this.updateState(payload, "warning");
      return toastId;
    },

    error(payload) {
      const toastId = this.updateState(payload, "error");
      return toastId;
    },

    hide(id) {
      this.toasts = this.toasts.filter((t) => t.id !== id);
    }
  },
});