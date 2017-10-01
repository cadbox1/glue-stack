import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Sidebar from "./sidebar";
import User from "./user";
import Task from "./task";

class Main extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showSideBar: true,
		};
	}

	toggleSideBar = evt => {
		const { showSideBar } = this.state;
		this.setState({ showSideBar: !showSideBar });
	};

	render() {
		const { signOut } = this.props;
		const { showSideBar } = this.state;
		return (
			<div style={{ display: "flex" }}>
				<Sidebar signOut={signOut} showSideBar={showSideBar} />
				<div style={{ flex: 1 }}>
					<Switch>
						<Route
							path="/users"
							render={props =>
								<User {...props} toggleSideBar={this.toggleSideBar} />}
						/>
						<Route
							path="/tasks"
							render={props =>
								<Task {...props} toggleSideBar={this.toggleSideBar} />}
						/>
						<Route exactly path="/" render={() => <Redirect to="/users" />} />
					</Switch>
				</div>
			</div>
		);
	}
}

export { Main };
