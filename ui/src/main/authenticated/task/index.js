import React, { Component } from "react";
import { Link, Route, Switch } from "react-router-dom";
import componentQueries from "react-component-queries";
import IconButton from "@material-ui/core/IconButton";
import FilterListIcon from "@material-ui/icons/FilterList";
import Add from "@material-ui/icons/Add";
import { Container } from "common/components/Container";
import { Page } from "common/components/Page";
import { AppBar } from "common/components/AppBar";
import { MenuButton } from "common/components/MenuButton";
import { AppBarTitle } from "common/components/AppBarTitle";
import { RefreshButton } from "common/components/RefreshButton";
import { connect } from "common/connector";
import { urlStateHolder } from "common/stateHolder";
import { Search } from "./search";
import { List, connectConfig } from "./list";
import { Create, Edit } from "./form";

class Task extends Component {
	state = { showFilters: false };

	toggleShowFilters = () => {
		this.setState(({ showFilters }) => ({ showFilters: !showFilters }));
	};

	render() {
		const { match, findAll, toggleSideBar, singleView } = this.props;
		const { showFilters } = this.state;
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
								<IconButton onClick={this.toggleShowFilters} color="inherit">
									<FilterListIcon />
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
							{showFilters && <Search {...props} findAll={findAll} />}
							<List {...props} listURL={match.path} findAll={findAll} />
						</Page>
					)}
				/>
				<Switch>
					<Route
						path={`${match.path}/create`}
						render={props => (
							<Create
								{...props}
								refreshList={singleView ? undefined : findAll.call}
							/>
						)}
					/>
					<Route
						path={`${match.path}/:id`}
						render={props => (
							<Edit
								{...props}
								refreshList={singleView ? undefined : findAll.call}
							/>
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
