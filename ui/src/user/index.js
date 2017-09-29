import React, { Component } from "react";
import { Link, Route, Switch } from "react-router-dom";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import IconButton from "material-ui/IconButton";
import MenuIcon from "material-ui-icons/Menu";
import Add from "material-ui-icons/Add";
import Refresh from "material-ui-icons/Refresh";
import SidebarStore from "sidebar/store";
import { findAll } from "api/user";
import { connect } from "api/connector";

import List from "./list";
import { Create, Edit } from "./form";

class UserIndex extends Component {
	render() {
		const { match, findAll } = this.props;

		return (
			<div className="row no-gutters">
				<Route
					path={`${match.path}`}
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
										Users
									</Typography>
									<IconButton onClick={findAll.promise}>
										<Refresh />
									</IconButton>
									<Link to={`${match.path}/create`}>
										<IconButton>
											<Add />
										</IconButton>
									</Link>
								</Toolbar>
							</AppBar>
							<List listURL={match.path} findAll={findAll} />
						</div>}
				/>
				<Switch>
					<Route
						path={`${match.path}/create`}
						render={props =>
							<Create
								{...props}
								className="col h-100vh"
								refreshList={findAll.promise}
							/>}
					/>
					<Route
						path={`${match.path}/:id`}
						render={props =>
							<Edit
								{...props}
								className="col h-100vh"
								refreshList={findAll.promise}
							/>}
					/>
				</Switch>
			</div>
		);
	}
}

export default connect({
	findAll: {
		params: props => ({}),
		promise: findAll,
	},
})(UserIndex);
