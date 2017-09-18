import { action, observable } from "mobx";
import { fromPromise } from "mobx-utils";
import axios from "axios";
import { setCredentials } from "./axiosConfig";

const credentialsKey = "credentials";

class CurrentUserStore {
	@observable user = null;

	@action.bound
	authenticate(username, password) {
		if (username == null) {
			const credentials = this.getCredentials();
			if (!credentials) {
				return;
			}
			username = credentials.username;
			password = credentials.password;
		}
		this.user = fromPromise(
			axios
				.get("authenticate", { auth: { username, password } })
				.then(result => {
					setCredentials(username, password);
					this.saveCredentials(username, password);
					return result;
				})
		);
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

	@action.bound
	signOut() {
		this.user = null;
		setCredentials();
		localStorage.removeItem(credentialsKey);
	}
}

const currentUserStore = new CurrentUserStore();

export default currentUserStore;
export { CurrentUserStore };
