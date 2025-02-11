import { defineStore } from "pinia";

export default defineStore("loading-store", {
	state: () => ({
		loading: false,
	}),
	actions: {
		show() {
			this.loading = true;
			return this.loading;
		},
		hide() {
			this.loading = false;
			return this.loading;
		},
	},
});
