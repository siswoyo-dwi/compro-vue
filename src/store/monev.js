import { defineStore } from "pinia";
import moment from "moment";

export const useStore = defineStore("monev_kudus", {
	// arrow function recommended for full type inference
	state: () => {
		return {
			validation_email: null,
			token: null,
			expired_token: null,
			refresh_token: null,
			expired_refresh: null,
			sideBarMinimize: false,
			sidebarShow: true,
			role_aktif: null,
			// user: null,
			user: null,
			EPlanYear: null,
			monevYear: null,
			sticky: false,
			active_role: null,
			active_puskesmas: null,
			active_seksi: null,
			active_bidang: null,
			jadwal: null,
		};
	},
	getters: {
		stateToken: (state) => {
			const x = state.token;
			return x;
		},
	},
	actions: {
		save_email(email) {
			this.validation_email = email;
		},
		save_attend(room_code) {
			this.attending.push(room_code);
		},
		login_token(token) {
			this.token = token.token;
			this.user = token;
			this.active_role = token.role;
			this.active_puskesmas = token.ms_puskesmas_id ? token.ms_puskesmas_id : null;
			this.active_seksi = token.ms_seksi_id ? token.ms_seksi_id : null;
			this.active_bidang = token.ms_bidang_id ? token.ms_bidang_id : null;
		},
		token_refresh(token) {
			this.token = token.access_token;
			this.expired_token = moment().add(595, "seconds");
		},
		clear_token() {
			this.token = null;
			this.user = null;
			this.validation_email = null;
			this.expired_token = null;
			this.active_role = null;
			this.active_puskesmas = null;
			this.active_seksi = null;
			this.active_bidang = null;
		},
		update_user(data) {
			this.user = data;
		},
		setChatRoomId(id) {
			this.chat_room_id = id;
		},
		hideSidebar() {
			this.sidebarShow = !this.sidebarShow;
		},
		setEPlan(year) {
			this.EPlanYear = year;
		},
		setMonev(year) {
			this.monevYear = year;
		},
		toogleSticky(value) {
			this.sticky = value;
		},
		set_puskesmas(value) {
			this.active_puskesmas = value;
		},
		set_role(value) {
			this.active_role = value;
		},
		set_seksi(value) {
			this.active_seksi = value;
		},
		set_bidang(value) {
			this.active_bidang = value;
		},
		set_jadwal(sche) {
			this.jadwal = {};
			const x = {};
			sche.forEach((s) => {
				if (s.fase) {
					x[s.fase] = s;
				}
			});
			this.jadwal = x;
		},
	},

	persist: {
		storage: localStorage,
	},
});
