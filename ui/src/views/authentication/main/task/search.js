import React, { Component } from "react";
import { Link, Route, Switch } from "react-router-dom";
import AppBar from "material-ui/AppBar";
import Close from "material-ui-icons/Close";
import Paper from "material-ui/Paper";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import IconButton from "material-ui/IconButton";
import MenuItem from "material-ui/Menu/MenuItem";
import TextField from "common/TextField";
import { connect } from "api/connector";
import { stateHolder } from "common/stateHolder";
import { TaskStatus } from "common/taskStatus";
import { List, connectConfig } from "../user/list";

const ConnectedUserList = stateHolder(connect(connectConfig)(List));

class Search extends Component {
	handleSelectUser = user => {
		const { findAll } = this.props;
		findAll.handleUpdate({ userId: user.id });
	};

	handleStatusChange = evt => {
		const { findAll } = this.props;
		findAll.handleUpdate({ statusId: evt.target.value });
	};

	render() {
		const { className, findAll, match } = this.props;
		return (
			<Paper className={className} elevation={1}>
				<Switch>
					<Route
						path={`${match.url}/users`}
						render={props => (
							<div>
								<AppBar position="static">
									<Toolbar>
										<Typography
											type="title"
											color="inherit"
											className="mr-auto"
										>
											Filter By User
										</Typography>
										<Link to={match.url}>
											<IconButton color="contrast">
												<Close />
											</IconButton>
										</Link>
									</Toolbar>
								</AppBar>
								<ConnectedUserList
									{...props}
									onSelect={this.handleSelectUser}
								/>
							</div>
						)}
					/>
					<Route
						render={props => (
							<div>
								<AppBar position="static">
									<Toolbar>
										<Typography
											type="title"
											color="inherit"
											className="mr-auto"
										>
											Search
										</Typography>
										<Link to="/tasks">
											<IconButton color="contrast">
												<Close />
											</IconButton>
										</Link>
									</Toolbar>
								</AppBar>
								<div className="container-fluid">
									<TextField
										value={(findAll.params && findAll.params.statusId) || "any"}
										onChange={this.handleStatusChange}
										label="Status"
										select
									>
										<MenuItem value="any">Any</MenuItem>
										<MenuItem value={String(TaskStatus.TODO)}>Todo</MenuItem>
										<MenuItem value={String(TaskStatus.DONE)}>Done</MenuItem>
									</TextField>
									<Link to={`${match.url}/users`}>Filter By User</Link>
								</div>
							</div>
						)}
					/>
				</Switch>
			</Paper>
		);
	}
}

export { Search };
