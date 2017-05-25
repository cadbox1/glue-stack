import { action, observable } from "mobx";
import axios from "axios";

import Organisation from "./Organisation";

class OrganisationStore {
	create() {
		return new Organisation();
	}

	save(organisation) {
		if (organisation.id == null) {
			axios.post("organisations", organisation.toJS());
		}
	}
}

const organisationStore = new OrganisationStore();

export default organisationStore;
