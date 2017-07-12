import { action, observable, autorun } from "mobx";

class Collection {
	@observable query;
	@observable request;

	constructor(store) {
		this.store = store;
	}

	create() {
		this.store.create(this);
		autorun(this.refresh);
	}

	refresh() {
		console.log("refresh collection");
	}
}

export default Collection;
