import { action, observable } from "mobx";
import uuid from "uuid/v4";

import User from "./User";

import OrganisationStore from "./OrganisationStore";

class Organisation {
	@observable id;

	@observable name;

	@observable user;

	constructor() {
		this.name = "";
		this.user = new User();
	}

	save() {
		return OrganisationStore.save(this);
	}

	toJS() {
		return {
			id: this.id,
			name: this.name,
			users: [this.user.toJS()],
		};
	}
}

export default Organisation;
