import axios from "axios";
import { setCredentials } from "common/axiosConfig";

const credentialsKey = "credentials";

export function authenticate({ username, password } = {}) {
	if (username == null) {
		const credentials = getCredentials();
		if (!credentials) {
			return Promise.reject();
		}
		username = credentials.username;
		password = credentials.password;
	}
	return axios
		.get("authenticate", { auth: { username, password } })
		.then(result => {
			setCredentials(username, password);
			saveCredentials(username, password);
			return result;
		});
}

export function signOut() {
	setCredentials();
	localStorage.removeItem(credentialsKey);
}

function getCredentials() {
	const credentialsJSON = localStorage.getItem(credentialsKey);
	if (!credentialsJSON) {
		return;
	}
	return JSON.parse(credentialsJSON);
}

function saveCredentials(username, password) {
	localStorage.setItem(credentialsKey, JSON.stringify({ username, password }));
}
