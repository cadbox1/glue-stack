import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { AppBar } from "material-ui";
import SidebarStore from "../sidebar/store";

const Todo = () => (
	<div>
		<AppBar title="Todo" onLeftIconButtonTouchTap={SidebarStore.toggle} />
	</div>
);

export default Todo;
