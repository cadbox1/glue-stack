import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Sidebar from "./sidebar";
import { Me } from "./me";
import Task from "./task";
import User from "./user";

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
				<Sidebar signOut={signOut} showSideBar={showSideBar} {...this.props} />
				<div style={{ flex: 1 }}>
					<Switch>
						<Route
							path="/me"
							render={props => (
								<Me
									{...props}
									{...this.props}
									toggleSideBar={this.toggleSideBar}
								/>
							)}
						/>
						<Route
							path="/tasks"
							render={props => (
								<Task
									{...props}
									{...this.props}
									toggleSideBar={this.toggleSideBar}
								/>
							)}
						/>
						<Route
							path="/users"
							render={props => (
								<User
									{...props}
									{...this.props}
									toggleSideBar={this.toggleSideBar}
								/>
							)}
						/>
						<Route exactly path="/" render={() => <Redirect to="/me" />} />
					</Switch>
				</div>
			</div>
		);
	}
}

export { Main };
