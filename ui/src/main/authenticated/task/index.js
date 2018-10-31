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
import CreateIcon from "@material-ui/icons/Create";
import Add from "@material-ui/icons/Add";
import { Container } from "common/components/Container";
import { Page } from "common/components/Page";
import { AppBar } from "common/components/AppBar";
import { MenuButton } from "common/components/MenuButton";
import { AppBarTitle } from "common/components/AppBarTitle";
import { RefreshButton } from "common/components/RefreshButton";
import { Link } from "common/components/Link";
import { URLStateHolder } from "common/components/StateHolder";
import { Search } from "./search";
import { List, ListConnect } from "./list";
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
			selectedIds: [],
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

	handleSelectIds = selectedIds => {
		this.setState({ selectedIds });
	};

	render() {
		const { classes, match, findAll, toggleSideBar, singleView } = this.props;
		const { search, selectedIds } = this.state;

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
								{selectedIds.length > 0 ? (
									<Fragment>
										<AppBarTitle>{selectedIds.length} selected</AppBarTitle>
										<IconButton
											component={Link}
											to={`${match.path}/action`}
											color="inherit"
										>
											<CreateIcon />
										</IconButton>
									</Fragment>
								) : activeSearch ? (
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
							<List
								{...props}
								listURL={match.path}
								findAll={findAll}
								selectedIds={selectedIds}
								onSelectIds={this.handleSelectIds}
							/>
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
						path={`${match.path}/action`}
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
	})(Task)
);

const ConnectedTask = props => (
	<URLStateHolder>
		{({ handleUpdate, params }) => (
			<ListConnect handleUpdate={handleUpdate} params={params}>
				{({ findAll }) => <Task {...props} findAll={findAll} />}
			</ListConnect>
		)}
	</URLStateHolder>
);

export { ConnectedTask as Task };
