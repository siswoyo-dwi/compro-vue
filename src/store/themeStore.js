import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

export const useThemeStore = defineStore('theme', () => {
  const isDark = ref(localStorage.getItem("isDark"));

  const applyTheme = () => {
    if (isDark.value) {
      document.documentElement.classList.add("dark"); // Tambahkan class dark
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark"); // Hapus class dark
      localStorage.setItem("theme", "light");
    }
  };

  watch(isDark, applyTheme, { immediate: true }); // Pantau perubahan

  const toggleTheme = () => {
    isDark.value = !isDark.value;
    localStorage.setItem("isDark",isDark.value);
  };

  return { isDark, toggleTheme };
});
