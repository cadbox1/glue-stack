import React from "react";
import { Link } from "react-router-dom";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import IconButton from "material-ui/IconButton";
import Add from "material-ui-icons/Add";
import MenuIcon from "material-ui-icons/Menu";
import SidebarStore from "sidebar/store";

import List from "./list";

const Todo = () =>
	<div>
		<AppBar position="static">
			<Toolbar>
				<IconButton
					onClick={SidebarStore.toggle}
					color="contrast"
					aria-label="Menu"
				>
					<MenuIcon />
				</IconButton>
				<Typography type="title" className="mr-auto">
					Me
				</Typography>
				<Link to={`/tasks`}>
					<IconButton>
						<Add />
					</IconButton>
				</Link>
			</Toolbar>
		</AppBar>
		<List />
	</div>;

export default Todo;
