import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { Signup } from "./signup";
import { Login } from "./login";

class Unauthenticated extends Component {
	render() {
		return (
			<Switch>
				<Route
					path="/signup"
					render={props => <Signup {...props} {...this.props} />}
				/>
				<Route render={props => <Login {...props} {...this.props} />} />
			</Switch>
		);
	}
}

export { Unauthenticated };
