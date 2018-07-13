import React, { Component, Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import componentQueries from "react-component-queries";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import Close from "@material-ui/icons/Close";
import FilterListIcon from "@material-ui/icons/FilterList";
import SearchIcon from "@material-ui/icons/Search";
import Add from "@material-ui/icons/Add";
import { Container } from "common/components/Container";
import { Page } from "common/components/Page";
import { AppBar } from "common/components/AppBar";
import { MenuButton } from "common/components/MenuButton";
import { AppBarTitle } from "common/components/AppBarTitle";
import { RefreshButton } from "common/components/RefreshButton";
import { Link } from "common/components/Link";
import { connect } from "common/connector";
import { urlStateHolder } from "common/stateHolder";
import { Search } from "./search";
import { List, connectConfig } from "./list";
import { Create, Edit } from "./form";
import { TextField } from "common/components/TextField";

class Task extends Component {
	handleSearchButton = () => {
		const { findAll } = this.props;
		findAll.handleUpdate({ search: "" });
	};

	handleSearchInputChange = evt => {
		const { findAll } = this.props;
		findAll.handleUpdate({ search: evt.target.value });
	};

	handleSearchClose = () => {
		const { findAll } = this.props;
		findAll.handleUpdate({ search: undefined });
	};

	render() {
		const { match, findAll, toggleSideBar, singleView } = this.props;

		const someActiveParams = Object.keys(findAll.getActiveParams()).length > 0;
		const activeSearch = findAll.params.name !== undefined;

		return (
			<Container>
				<Route
					path={`${match.path}`}
					exact={singleView}
					render={props => (
						<Page>
							<AppBar>
								{activeSearch ? (
									<Fragment>
										<TextField
											onChange={this.handleSearchInputChange}
											autoFocus
											fullWidth
										/>
										<IconButton
											onClick={this.handleSearchClose}
											color="inherit"
										>
											<Close />
										</IconButton>
									</Fragment>
								) : (
									<Fragment>
										<MenuButton toggleSideBar={toggleSideBar} />
										<AppBarTitle>Tasks</AppBarTitle>
										<IconButton
											onClick={this.handleSearchButton}
											color="inherit"
										>
											<SearchIcon />
										</IconButton>

										<IconButton
											component={Link}
											to={`${match.path}/filter`}
											color="inherit"
										>
											{someActiveParams ? (
												<Badge
													badgeContent={
														Object.keys(findAll.getActiveParams()).length
													}
													color="secondary"
												>
													<FilterListIcon />
												</Badge>
											) : (
												<FilterListIcon />
											)}
										</IconButton>
										<RefreshButton findAll={findAll} />
										<IconButton
											component={Link}
											to={`${match.path}/create`}
											color="inherit"
										>
											<Add />
										</IconButton>
									</Fragment>
								)}
							</AppBar>
							<List {...props} listURL={match.path} findAll={findAll} />
						</Page>
					)}
				/>
				<Switch>
					<Route
						path={`${match.path}/filter`}
						render={props => (
							<Page>
								<Search {...props} findAll={findAll} />
							</Page>
						)}
					/>
					<Route
						path={`${match.path}/create`}
						render={props => (
							<Page>
								<Create
									{...props}
									refreshList={singleView ? undefined : findAll.call}
								/>
							</Page>
						)}
					/>
					<Route
						path={`${match.path}/:id`}
						render={props => (
							<Page>
								<Edit
									{...props}
									refreshList={singleView ? undefined : findAll.call}
								/>
							</Page>
						)}
					/>
				</Switch>
			</Container>
		);
	}
}

Task = componentQueries({
	queries: [
		({ width }) => ({
			singleView: width < 1000,
		}),
	],
	config: { pure: false },
})(urlStateHolder(connect(connectConfig)(Task)));

export { Task };
