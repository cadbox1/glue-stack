import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import IconButton from "material-ui/IconButton";
import MenuIcon from "material-ui-icons/Menu";
import Add from "material-ui-icons/Add";
import SidebarStore from "sidebar/store";
import { observable } from "mobx";
import { observer } from "mobx-react";
import { fromPromise } from "mobx-utils";
import axios from "axios";

import List from "./list";
import Item from "./item";

@observer
class TaskIndex extends Component {
	@observable request;

	isLargeScreen = (props = this.props) => {
		return true;
	};

	load = () => {
		this.request = fromPromise(axios.get("tasks"));
	};

	render() {
		const request = this.request;
		const { match } = this.props;
		return (
			<div className="row no-gutters">
				<Route
					path={`${match.path}`}
					exact={!this.isLargeScreen()}
					render={props =>
						<div className="col h-100vh">
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
										Tasks
									</Typography>
									<Link to={`${match.path}/create`}>
										<IconButton>
											<Add />
										</IconButton>
									</Link>
								</Toolbar>
							</AppBar>
							<List load={this.load} request={request} />
						</div>}
				/>
				<Route
					path={`${match.path}/:id`}
					render={props =>
						<Item
							{...props}
							className="col h-100vh"
							load={this.isLargeScreen() ? this.load : undefined}
						/>}
				/>
			</div>
		);
	}
}

export default TaskIndex;
