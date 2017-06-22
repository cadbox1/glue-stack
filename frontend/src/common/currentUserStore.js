import { action, observable } from "mobx";
import axios from "axios";
import { setCredentials } from "./axiosConfig";

const credentialsKey = "credentials";

class CurrentUserStore {
	@observable user;

	@action.bound authenticate(username, password) {
		return axios
			.get("authenticate", { auth: { username, password } })
			.then(result => {
				this.user = result;
				setCredentials(username, password);
				this.saveCredentials(username, password);
				return result;
			});
	}

	saveCredentials(username, password) {
		localStorage.setItem(
			credentialsKey,
			JSON.stringify({ username, password })
		);
	}

	getCredentials() {
		const credentialsJSON = localStorage.getItem(credentialsKey);
		if (!credentialsJSON) {
			return null;
		}
		return JSON.parse(credentialsJSON);
	}

	@action.bound signOut() {
		this.user = null;
		setCredentials();
		localStorage.removeItem(credentialsKey);
	}
}

const currentUserStore = new CurrentUserStore();

export default currentUserStore;
export { CurrentUserStore };
