import { action, observable, toJS } from "mobx";

class User {
	@observable id;
	@observable name;
	@observable notes;
	@observable active = true;

	constructor({ store, collection }) {
		this.collection = this.collection;
		this.store = store;
	}

	load() {
		this.store.load(this.id);
	}

	save() {
		this.store.save(this);
		if (this.collection) {
			this.collection.refresh();
		}
	}

	toJS() {
		return toJS(this);
	}
}

export default User;
