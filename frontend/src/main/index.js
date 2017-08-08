import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { observer } from "mobx-react";
import { FULFILLED } from "mobx-utils";
import Sidebar from "sidebar";
import User from "user";
import Login from "login";
import Task from "task";
import currentUserStore from "common/currentUserStore";

@observer
class Main extends Component {
	componentDidMount() {
		currentUserStore.authenticate();
	}

	render() {
		const user = currentUserStore.user;
		if (!user || user.state !== FULFILLED) {
			return <Login />;
		}
		return user.case({
			fulfilled: result =>
				<div style={{ display: "flex" }}>
					<Sidebar />
					<div style={{ flex: 1 }}>
						<Switch>
							<Route path="/users" component={User} />
							<Route path="/tasks" component={Task} />
							<Route exactly path="/" render={() => <Redirect to="/users" />} />
						</Switch>
					</div>
				</div>,
		});
	}
}

export default Main;
