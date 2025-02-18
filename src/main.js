import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import "./styles.css";
import router from "./router";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import "moment/dist/locale/id";
import { createI18n } from 'vue-i18n';

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
import en from './locales/en.json';
import id from './locales/id.json';

import "./index.css";
// Konfigurasi i18n
const i18n = createI18n({
	locale: 'en', // Bahasa default
	fallbackLocale: 'en', // Jika tidak ada terjemahan, pakai ini
	messages: { en, id }
  });
const app = createApp(App).use(router).use(pinia).use(i18n);
function extractName(filePath) {
	return filePath
		.split("/")
		.pop()
		.replace(/\.\w+$/, "");
}

const IconModules = import.meta.glob("./components/icons/**/*.vue", { eager: true });
const AtomModules = import.meta.glob("./components/atoms/**/*.vue", { eager: true });
const MoleculesModules = import.meta.glob("./components/molecules/**/*.vue", { eager: true });
const OrganismModules = import.meta.glob("./components/organism/**/*.vue", { eager: true });

Object.entries(IconModules).forEach(([filePath, component]) => {
	const iconName = `${component?.default?.name || extractName(filePath)}Icon`;
	app.component(iconName, component.default);
});

Object.entries(AtomModules).forEach(([filePath, component]) => {
	const conponentName = `${component?.default?.name || extractName(filePath)}`;
	app.component(conponentName, component.default);
});

Object.entries(MoleculesModules).forEach(([filePath, component]) => {
	const conponentName = `${component?.default?.name || extractName(filePath)}`;
	app.component(conponentName, component.default);
});

Object.entries(OrganismModules).forEach(([filePath, component]) => {
	const conponentName = `${component?.default?.name || extractName(filePath)}`;
	app.component(conponentName, component.default);
});

app.mount("#app");
