import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Sidebar from "../sidebar";
import Todo from "../todo";

const Main = () => {
	const authenticated = true;
	if (!authenticated) {
		return <Redirect to="/login" />;
	}
	return (
		<div style={{ display: "flex" }}>
			<Sidebar />
			<div style={{ flex: 1 }}>
				<Switch>
					<Route path="/todo" component={Todo} />
					<Route exactly path="/" render={() => <Redirect to="/todo" />} />
				</Switch>
			</div>
		</div>
	);
};

export default Main;
