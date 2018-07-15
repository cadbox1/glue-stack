import React, { Component, Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import ListSubheader from "@material-ui/core/ListSubheader";
import Close from "@material-ui/icons/Close";
import DeleteIcon from "@material-ui/icons/Delete";
import { Link } from "common/components/Link";
import { connect } from "common/connector";
import { stateHolder } from "common/stateHolder";
import { AppBar } from "common/components/AppBar";
import { AppBarTitle } from "common/components/AppBarTitle";
import { TaskStatus } from "api/task";
import { List as UserList, connectConfig } from "../user/list";

const ConnectedUserList = stateHolder(connect(connectConfig)(UserList));

class Search extends Component {
	handleSelectUser = user => {
		const { findAll } = this.props;
		const { userId } = findAll.params;
		const newUserId = userId === user.id ? null : user.id;
		findAll.handleUpdate({ userId: newUserId });
	};

	handleStatusChange = evt => {
		const { findAll } = this.props;
		const value = evt.target.value !== "" ? evt.target.value : undefined;
		findAll.handleUpdate({ statusId: value });
	};

	render() {
		const { findAll, match } = this.props;

		const activeParams = Object.keys(findAll.getActiveParams());
		const someActiveParams = activeParams.length > 0;

		const filters = [
			{
				name: "Assignee",
				path: "assignee",
				filterKey: "userId",
				component: (
					<ConnectedUserList
						onSelect={this.handleSelectUser}
						selected={[findAll.params.userId]}
					/>
				),
			},
			{
				name: "Status",
				path: "status",
				filterKey: "statusId",
				component: (
					<Select
						value={
							findAll.params.statusId != null ? findAll.params.statusId : ""
						}
						onChange={this.handleStatusChange}
						displayEmpty
					>
						<MenuItem value="">Any</MenuItem>
						<MenuItem value={TaskStatus.TODO}>Todo</MenuItem>
						<MenuItem value={TaskStatus.DONE}>Done</MenuItem>
					</Select>
				),
			},
		];

		return (
			<Switch>
				{filters.map(filter => (
					<Route
						key={filter.path}
						path={`${match.path}/${filter.path}`}
						render={props => (
							<Fragment>
								<AppBar>
									<AppBarTitle>Filters > {filter.name}</AppBarTitle>
									<IconButton
										component={Link}
										to="/tasks/filter"
										color="inherit"
									>
										<Close />
									</IconButton>
								</AppBar>
								{filter.component}
							</Fragment>
						)}
					/>
				))}
				<Route
					render={props => (
						<Fragment>
							<AppBar>
								<AppBarTitle>Filters</AppBarTitle>
								<IconButton component={Link} to="/tasks" color="inherit">
									<Close />
								</IconButton>
							</AppBar>
							<List>
								{someActiveParams && <ListSubheader>Selected</ListSubheader>}
								{filters
									.filter(filter => activeParams.includes(filter.filterKey))
									.map(filter => (
										<FilterListItem
											key={filter.path}
											filter={filter}
											match={match}
											handleUpdate={findAll.handleUpdate}
										/>
									))}
								{someActiveParams && <ListSubheader>Available</ListSubheader>}
								{filters
									.filter(filter => !activeParams.includes(filter.filterKey))
									.map(filter => (
										<FilterListItem
											key={filter.path}
											filter={filter}
											match={match}
										/>
									))}
							</List>
						</Fragment>
					)}
				/>
			</Switch>
		);
	}
}

class FilterListItem extends Component {
	handleDelete = () => {
		const { filter, handleUpdate } = this.props;
		handleUpdate({ [filter.filterKey]: undefined });
	};

	render() {
		const { filter, match, handleUpdate } = this.props;
		return (
			<ListItem component={Link} to={`${match.url}/${filter.path}`} button>
				<ListItemText primary={filter.name} />
				<ListItemSecondaryAction>
					{handleUpdate != null && (
						<IconButton onClick={this.handleDelete} aria-label="Delete">
							<DeleteIcon />
						</IconButton>
					)}
				</ListItemSecondaryAction>
			</ListItem>
		);
	}
}

export { Search };
