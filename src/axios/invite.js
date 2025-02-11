import axios from "axios";
import { useStore } from "../store/monev";

const ip = "https://api-seeu.ajari.app";

const instance = axios.create({
	baseURL: ip,
	headers: {
		"Content-Type": "application/json; charset=utf-8",
	},
});

instance.interceptors.request.use(async (req) => {
	const store = useStore();
	const storageToken = localStorage.getItem("token");

	const token = store.token || storageToken;
	req.headers.authorization = token ? "Bearer " + token : null;
	return req;
});

const responseInterceptor = (res) => {
	return res;
};

const errorInterceptor = (error) => {
	console.log("errorInterceptor", error);
	if (error.status === 401) {
		window.location.href = "/login";
		return;
	}
	return Promise.reject(error);
};

instance.interceptors.response.use(responseInterceptor, errorInterceptor);

export default instance;
