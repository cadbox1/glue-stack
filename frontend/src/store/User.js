import { action, observable } from "mobx";

class User {
	@observable id;
	@observable firstName;
	@observable lastName;
	@observable email;
	@observable password;

	constructor() {
		this.firstName = "";
		this.lastName = "";
		this.email = "";
		this.password = "";
	}

	toJS() {
		return {
			id: this.id,
			firstName: this.firstName,
			lastName: this.lastName,
			email: this.email,
			password: this.password,
		};
	}
}

export default User;
