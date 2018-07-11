import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import componentQueries from "react-component-queries";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import FilterListIcon from "@material-ui/icons/FilterList";
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

class Task extends Component {
	render() {
		const { match, findAll, toggleSideBar, singleView } = this.props;

		const someActiveParams = Object.keys(findAll.getActiveParams()).length > 0;

		return (
			<Container>
				<Route
					path={`${match.path}`}
					exact={singleView}
					render={props => (
						<Page>
							<AppBar>
								<MenuButton toggleSideBar={toggleSideBar} />
								<AppBarTitle>Tasks</AppBarTitle>
								{/* <Link to={`${match.path}/search`}>
										<IconButton color="inherit">
											<SearchIcon />
										</IconButton>
									</Link> */}

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
