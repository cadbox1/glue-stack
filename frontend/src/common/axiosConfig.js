import axios from "axios";

axios.defaults.baseURL = "api/";
axios.defaults.headers = { "X-Requested-With": "XMLHttpRequest" };

export function setCredentials(username, password) {
	axios.defaults.auth = {
		username,
		password,
	};
}
