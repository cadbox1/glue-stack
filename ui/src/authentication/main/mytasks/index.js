import React, { Component } from "react";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import IconButton from "material-ui/IconButton";
import MenuIcon from "material-ui-icons/Menu";
import Refresh from "material-ui-icons/Refresh";
import { findAll } from "api/task";
import { connect } from "api/connector";
import List from "../task/list";

class MyTasks extends Component {
	render() {
		const { findAll, toggleSideBar } = this.props;
		return (
			<div>
				<AppBar position="static">
					<Toolbar>
						<IconButton
							onClick={toggleSideBar}
							color="contrast"
							aria-label="Menu"
						>
							<MenuIcon />
						</IconButton>
						<Typography type="title" className="mr-auto">
							My Tasks
						</Typography>
						<IconButton onClick={findAll.promise}>
							<Refresh />
						</IconButton>
					</Toolbar>
				</AppBar>
				<List findAll={findAll} />
			</div>
		);
	}
}

const ConnectedMyTasks = connect({
	findAll: {
		params: props => ({ userId: props.authenticate.value.data.id }),
		promise: findAll,
	},
})(MyTasks);

export { ConnectedMyTasks as MyTasks };
