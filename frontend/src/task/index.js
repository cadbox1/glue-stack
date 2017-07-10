import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import { AppBar } from "material-ui";
import ContentAdd from "material-ui/svg-icons/content/add";
import IconButton from "material-ui/IconButton";
import SidebarStore from "sidebar/store";

import List from "./list";
import Item from "./item";

const Task = ({ match }) =>
	<div className="row no-gutters">
		<div className="col">
			<AppBar
				title="Tasks"
				onLeftIconButtonTouchTap={SidebarStore.toggle}
				iconElementRight={
					<Link to={`${match.path}/create`}>
						<IconButton>
							<ContentAdd />
						</IconButton>
					</Link>
				}
			/>
			<List />
		</div>
		<Route
			path={`${match.path}/:id`}
			render={props => <Item {...props} className="col" />}
		/>
	</div>;

export default Task;
