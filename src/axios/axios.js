import axios from "axios";
import { useStore } from "../store/monev";
import moment from "moment";
import useToast from "../store/toast";

const ip = import.meta.env.VITE_MONEV_BE_BASE_URL;

const instance = axios.create({
	baseURL: ip,
});

instance.interceptors.request.use(async (req) => {
	const store = useStore();
	let token = store.token ? store.token : null;
	if (!token) {
		token = store.token;
		req.headers.authorization = token ? "Bearer " + token : null;
		return req;
	} else {
		req.headers.authorization = token ? "Bearer " + token : null;
		return req;
	}
});

// instance.interceptors.request.use(async (req) => {
// 	const store = useStore();
// 	const toast = useToast();
// 	let exp = store.expired_token;
// 	let refresh_token = store.refresh_token;
// 	let rexp = store.expired_refresh;
// 	let storageToken = localStorage.getItem("token");
// 	let now = moment();
// 	let token = store.token || storageToken;s
// 	if (!token) {
// 		token = store.token;
// 		req.headers.authorization = token ? "Bearer " + token : null;
// 		return req;
// 	} else {
// 		if (!exp) {
// 			token = store.token;
// 			req.headers.authorization = token ? "Bearer " + token : null;
// 			return req;
// 		} else {
// 			let isExpired = now.diff(exp, "seconds") > 0;
// 			let relog = now.diff(rexp, "seconds") > 0;
// 			// console.log(moment(exp).format("HH:mm"), moment().format("HH:mm"), moment(rexp).format("HH:mm"), isExpired);
// 			if (!relog) {
// 				if (isExpired && token && exp) {
// 					console.log("expired?");
// 					try {
// 						const res = await axios.post(
// 							ip + "account/refresh-token",
// 							{},
// 							{
// 								headers: {
// 									authorization: "Bearer " + refresh_token,
// 								},
// 							}
// 						);
// 						if (res.data.code == 200) {
// 							store.token_refresh(res.data.data);
// 							req.headers.authorization = "Bearer " + res.data.data.access_token;
// 							return req;
// 						} else {
// 							toast.warning({
// 								text: "Gagal memperbarui sesi silahkan Login kembali",
// 							});
// 							setTimeout(() => {
// 								store.clear_token();
// 								window.location.href = "/login";
// 							}, 1500);
// 						}
// 					} catch (err) {
// 						console.log(err);
// 						if (token) {
// 							toast.warning({
// 								text: "Gagal memperbarui sesi silahkan Login kembali",
// 							});
// 							setTimeout(() => {
// 								store.clear_token();
// 								window.location.href = "/login";
// 							}, 2500);
// 							return req;
// 						}
// 					}
// 				} else {
// 					req.headers.authorization = token ? "Bearer " + token : null;
// 					return req;
// 				}
// 			} else {
// 				console.log("relog");
// 				toast.warning({
// 					text: "Sesi anda sudah berakhir silahkan Login kembali",
// 				});
// 				setTimeout(() => {
// 					store.clear_token();
// 					window.location.href = "/login";
// 				}, 2500);
// 				return req;
// 			}
// 		}
// 	}
// });

const responseInterceptor = (res) => {
	// console.log(res);
	return res;
};

const errorInterceptor = (error) => {
	const store = useStore();
	console.log("errorInterceptor", error);
	if (error.status === 401) {
		setTimeout(() => {
			store.clear_token();
			window.location.href = "/login";
			return;
		}, 2000);
	}
	return Promise.reject(error);
};

instance.interceptors.response.use(responseInterceptor, errorInterceptor);

export default instance;
