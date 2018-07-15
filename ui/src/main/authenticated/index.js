import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import componentQueries from "react-component-queries";
import { Sidebar } from "./sidebar";
import { Me } from "./me";
import { Task } from "./task";
import { User } from "./user";

class Authenticated extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showSideBar: !props.temporaryDock,
		};
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.temporaryDock !== this.props.temporaryDock) {
			this.setState({ showSideBar: !nextProps.temporaryDock });
		}
	}

	toggleSideBar = evt => {
		const { showSideBar } = this.state;
		this.setState({ showSideBar: !showSideBar });
	};

	render() {
		const { signOut, temporaryDock } = this.props;
		const { showSideBar } = this.state;
		return (
			<div style={{ display: "flex", height: "100%" }}>
				<Sidebar
					temporaryDock={temporaryDock}
					signOut={signOut}
					showSideBar={showSideBar}
					toggleSideBar={this.toggleSideBar}
					{...this.props}
				/>
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
		);
	}
}

Authenticated = componentQueries({
	queries: [
		({ width }) => ({
			temporaryDock: width < 800,
		}),
	],
	config: { pure: false },
})(Authenticated);

export { Authenticated };
