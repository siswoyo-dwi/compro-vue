import axios from "axios";
import { useStore } from "../store/jamdatun";
import { useRouter } from "vue-router";

const ip = import.meta.env.VITE_API_CHAT_BASE_URL;

const instance = axios.create({
	baseURL: ip,
});

instance.interceptors.request.use(async (req) => {
	const store = useStore();
	const storageToken = localStorage.getItem("chat_token");

	const token = store.chat_token || storageToken;
	req.headers.authorization = token ? "Bearer " + token : null;
	return req;
});

// instance.interceptors.response.use(async (res) => {
// 	// console.log(res)
// 	return res;
// });

const responseInterceptor = (res) => {
	return res;
};

const errorInterceptor = (error) => {
	if (error.response.data.message === "Invalid or expired token") {
		window.location.href = "/login";
		return;
	}
	if (error.status === 401) {
		// window.location.href = "/login";
		// return;
	}
	return Promise.reject(error);
};

instance.interceptors.response.use(responseInterceptor, errorInterceptor);

export default instance;
