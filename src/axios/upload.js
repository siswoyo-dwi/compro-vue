import axios from "axios";
import { useStore } from "../store/monev";

const ip = import.meta.env.VITE_API_AJARI_UPLOAD_URL;

const instance = axios.create({
	baseURL: ip,
	headers: {
		"Content-Type": "multipart/form-data",
	},
});

instance.interceptors.request.use(async (req) => {
	const store = useStore();
	const storageToken = localStorage.getItem("token");

	const token = store.token || storageToken;
	req.headers.authorization = token ? "Bearer " + token : null;
	return req;
});

instance.interceptors.response.use(async (res) => {
	// console.log(res)
	return res;
});
export default instance;
