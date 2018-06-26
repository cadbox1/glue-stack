import React, { Component } from "react";
import { Link, Route, Switch } from "react-router-dom";
import componentQueries from "react-component-queries";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import FilterListIcon from "@material-ui/icons/FilterList";
import Add from "@material-ui/icons/Add";
import Refresh from "@material-ui/icons/Refresh";
import CircularProgress from "@material-ui/core/CircularProgress";
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
			<div className="row no-gutters w-100" style={{ flexWrap: "nowrap" }}>
				<Route
					path={`${match.path}`}
					exact={singleView}
					render={props => (
						<div className="col h-100vh">
							<AppBar position="static">
								<Toolbar>
									<IconButton
										onClick={toggleSideBar}
										color="inherit"
										aria-label="Menu"
									>
										<MenuIcon />
									</IconButton>
									<Typography type="title" color="inherit" className="mr-auto">
										Tasks
									</Typography>
									{/* <Link to={`${match.path}/search`}>
										<IconButton color="inherit">
											<SearchIcon />
										</IconButton>
									</Link> */}
									<IconButton onClick={this.toggleShowFilters} color="inherit">
										<FilterListIcon />
									</IconButton>
									<IconButton onClick={findAll.refresh} color="inherit">
										{findAll.pending ? (
											<span>
												<CircularProgress color="inherit" size={20} />
											</span>
										) : (
											<Refresh />
										)}
									</IconButton>
									<Link to={`${match.path}/create`}>
										<IconButton color="inherit">
											<Add />
										</IconButton>
									</Link>
								</Toolbar>
							</AppBar>
							{showFilters && <Search {...props} findAll={findAll} />}
							<List {...props} listURL={match.path} findAll={findAll} />
						</div>
					)}
				/>
				<Switch>
					<Route
						path={`${match.path}/create`}
						render={props => (
							<Create
								{...props}
								className="col h-100vh"
								refreshList={singleView ? undefined : findAll.call}
							/>
						)}
					/>
					<Route
						path={`${match.path}/:id`}
						render={props => (
							<Edit
								{...props}
								className="col h-100vh"
								refreshList={singleView ? undefined : findAll.call}
							/>
						)}
					/>
				</Switch>
			</div>
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
