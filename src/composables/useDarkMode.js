import { ref, onMounted, watch } from "vue";

export function useDarkMode() {
  const isDark = ref(localStorage.getItem("theme") === "dark");

  const applyTheme = () => {
    if (isDark.value) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  // Terapkan tema saat pertama kali halaman dimuat
  onMounted(() => {
    applyTheme();
  });

  // Pantau perubahan nilai isDark dan terapkan tema
  watch(isDark, applyTheme);

  return { isDark, toggleTheme: () => (isDark.value = !isDark.value) };
}
