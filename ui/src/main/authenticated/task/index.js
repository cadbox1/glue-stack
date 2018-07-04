import React, { Component } from "react";
import { Link, Route, Switch } from "react-router-dom";
import componentQueries from "react-component-queries";
import IconButton from "@material-ui/core/IconButton";
import FilterListIcon from "@material-ui/icons/FilterList";
import Add from "@material-ui/icons/Add";
import { GluePage } from "common/components/gluePage";
import { GlueAppBar, GlueTitle } from "common/components/glueAppBar";
import { MenuButton } from "common/components/menuButton";
import { RefreshButton } from "common/components/refreshButton";
import { GlueContainer } from "common/components/glueContainer";
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
			<GlueContainer>
				<Route
					path={`${match.path}`}
					exact={singleView}
					render={props => (
						<GluePage>
							<GlueAppBar>
								<MenuButton toggleSideBar={toggleSideBar} />
								<GlueTitle>Tasks</GlueTitle>
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
							</GlueAppBar>
							{showFilters && <Search {...props} findAll={findAll} />}
							<List {...props} listURL={match.path} findAll={findAll} />
						</GluePage>
					)}
				/>
				<Switch>
					<Route
						path={`${match.path}/create`}
						render={props => (
							<GluePage>
								<Create
									{...props}
									refreshList={singleView ? undefined : findAll.call}
								/>
							</GluePage>
						)}
					/>
					<Route
						path={`${match.path}/:id`}
						render={props => (
							<GluePage>
								<Edit
									{...props}
									refreshList={singleView ? undefined : findAll.call}
								/>
							</GluePage>
						)}
					/>
				</Switch>
			</GlueContainer>
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
