import { action, observable } from "mobx";
import currentUserStore from "../common/currentUserStore";
import { history } from "../common/history";
import axios from "axios";

import Organisation from "./Organisation";

class OrganisationStore {
	create() {
		return new Organisation();
	}

	save(organisation) {
		if (organisation.id == null) {
			return axios
				.post("organisations", organisation.toJS())
				.then(result =>
					currentUserStore.authenticate(
						organisation.user.email,
						organisation.user.password
					)
				);
		}
	}
}

const organisationStore = new OrganisationStore();

export default organisationStore;
