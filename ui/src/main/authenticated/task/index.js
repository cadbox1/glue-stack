import React, { Component, Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import componentQueries from "react-component-queries";
import debounce from "lodash/debounce";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import ArrowBack from "@material-ui/icons/ArrowBack";
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

const styles = theme => ({
	inputRoot: {
		color: "inherit",
	},
});

class Task extends Component {
	constructor(props) {
		super();

		this.state = {
			search: props.location.query.search || "",
		};

		this.debouncedSearch = debounce(this.handleSearchUpdate, 300);
	}

	handleFormInput = evt => {
		this.setState({ [evt.target.name]: evt.target.value });
		this.debouncedSearch();
	};

	handleSearchButton = () => {
		const { findAll } = this.props;
		findAll.handleUpdate({ search: "" });
	};

	handleSearchUpdate = evt => {
		const { findAll } = this.props;
		const { search } = this.state;
		findAll.handleUpdate({ search });
	};

	handleSearchClose = () => {
		const { findAll } = this.props;
		findAll.handleUpdate({ search: undefined });
	};

	render() {
		const { classes, match, findAll, toggleSideBar, singleView } = this.props;
		const { search } = this.state;

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
										<IconButton
											onClick={this.handleSearchClose}
											color="inherit"
										>
											<ArrowBack />
										</IconButton>
										<TextField
											name="search"
											value={search}
											onChange={this.handleFormInput}
											autoFocus
											fullWidth
											margin="none"
											InputProps={{
												classes: { root: classes.inputRoot },
												disableUnderline: true,
											}}
										/>
										<RefreshButton findAll={findAll} />
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

Task = withStyles(styles)(
	componentQueries({
		queries: [
			({ width }) => ({
				singleView: width < 1000,
			}),
		],
		config: { pure: false },
	})(urlStateHolder(connect(connectConfig)(Task)))
);

export { Task };
