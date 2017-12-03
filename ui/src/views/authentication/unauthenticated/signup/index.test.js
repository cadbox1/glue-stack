import React from "react";
import ReactDOM from "react-dom";
import { Signup, unknownError, emailTakenError } from "./index";
import { Router } from "react-router-dom";
import { history } from "common/history";
import { authenticate } from "api/authentication";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

it("renders without crashing", () => {
	const div = document.createElement("div");
	ReactDOM.render(<Router history={history}>
		<Signup authenticate={authenticate} />
	</Router>, div);
});

it("handles error", () => {
	const div = document.createElement("div");
	const signup = shallow(<Signup authenticate={authenticate} />);
	signup.instance().handleError(createError("UniqueEmailConstraint"));
	expect(signup.state().emailError).toEqual(emailTakenError);
});

it("handles error", () => {
	const div = document.createElement("div");
	const signup = shallow(<Signup authenticate={authenticate} />);
	signup.instance().handleError(createError("SomeOtherError"));
	expect(signup.state().error).toEqual(unknownError);
});

const createError = code => {
	return {
		response: {
			data: {
				errors: [{
					code,
				}]
			}
		}
	};
}
