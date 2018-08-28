import React, { Component } from "react";
import { Link, Route, Switch } from "react-router-dom";
import componentQueries from "react-component-queries";
import IconButton from "@material-ui/core/IconButton";
import { Container } from "common/components/Container";
import { Page } from "common/components/Page";
import { AppBar } from "common/components/AppBar";
import { MenuButton } from "common/components/MenuButton";
import { AppBarTitle } from "common/components/AppBarTitle";
import { RefreshButton } from "common/components/RefreshButton";
import Add from "@material-ui/icons/Add";

import { ListConnect, List } from "./list";
import { Create, Edit } from "./form";
import { URLStateHolder } from "common/components/StateHolder";

class User extends Component {
	render() {
		const { match, findAll, singleView, toggleSideBar } = this.props;
		return (
			<Container>
				<Route
					path={`${match.path}`}
					exact={singleView}
					render={props => (
						<Page>
							<AppBar>
								<MenuButton toggleSideBar={toggleSideBar} />
								<AppBarTitle>Users</AppBarTitle>
								<RefreshButton findAll={findAll} />
								<IconButton
									component={Link}
									to={`${match.path}/create`}
									color="inherit"
								>
									<Add />
								</IconButton>
							</AppBar>
							<List listURL={match.path} findAll={findAll} />
						</Page>
					)}
				/>
				<Switch>
					<Route
						path={`${match.path}/create`}
						render={props => (
							<Create
								{...props}
								className="col h-100vh"
								refreshList={singleView ? undefined : findAll.refresh}
							/>
						)}
					/>
					<Route
						path={`${match.path}/:id`}
						render={props => (
							<Edit
								{...props}
								className="col h-100vh"
								refreshList={singleView ? undefined : findAll.refresh}
							/>
						)}
					/>
				</Switch>
			</Container>
		);
	}
}

User = componentQueries({
	queries: [
		({ width }) => ({
			singleView: width < 1000,
		}),
	],
	config: { pure: false },
})(User);

const ConnectedUser = props => (
	<URLStateHolder>
		{({ handleUpdate, params }) => (
			<ListConnect handleUpdate={handleUpdate} params={params}>
				{({ findAll }) => <User {...props} findAll={findAll} />}
			</ListConnect>
		)}
	</URLStateHolder>
);

export { ConnectedUser as User };
