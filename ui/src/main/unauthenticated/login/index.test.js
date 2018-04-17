import React from "react";
import ReactDOM from "react-dom";
import { Login, wrongCredentialsError } from "./index";
import { Router } from "react-router-dom";
import { history } from "common/history";
import { authenticate } from "api/authentication";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

it("renders without crashing", () => {
	const div = document.createElement("div");
	ReactDOM.render(
		<Router history={history}>
			<Login authenticate={authenticate} />
		</Router>,
		div
	);
});
