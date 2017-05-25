import axios from "axios";

axios.defaults.baseURL = "api/";

export function setCredentials(username, password) {
	axios.defaults.auth = {
		username,
		password,
	};
}
