import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { AppBar } from "material-ui";
import SidebarStore from "sidebar/store";

import List from "./list";

const Todo = () => (
	<div>
		<AppBar title="Todo" onLeftIconButtonTouchTap={SidebarStore.toggle} />
		<List />
	</div>
);

export default Todo;
