import axios from "axios";

axios.defaults.baseURL = "api/";
axios.defaults.headers = { "X-Requested-With": "XMLHttpRequest" };

export function setCredentials(username, password) {
	if (username) {
		axios.defaults.auth = {
			username,
			password,
		};
	} else {
		delete axios.defaults.auth;
	}
}
