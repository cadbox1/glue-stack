import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { observer } from "mobx-react";
import Sidebar from "sidebar";
import Todo from "todo";
import Login from "login";
import currentUserStore from "common/currentUserStore";

@observer class Main extends Component {
	componentDidMount() {
		currentUserStore.authenticate();
	}

	render() {
		const user = currentUserStore.user;
		if (!user) {
			return <Login />;
		}
		return user.case({
			pending: () => <div>Loading...</div>,
			rejected: error => <Login />,
			fulfilled: result => (
				<div style={{ display: "flex" }}>
					<Sidebar />
					<div style={{ flex: 1 }}>
						<Switch>
							<Route path="/todo" component={Todo} />
							<Route exactly path="/" render={() => <Redirect to="/todo" />} />
						</Switch>
					</div>
				</div>
			),
		});
	}
}

export default Main;
