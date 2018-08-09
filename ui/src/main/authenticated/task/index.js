import React, { Component, Fragment } from "react";
import { Route } from "react-router-dom";
import componentQueries from "react-component-queries";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
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
import { List, connectConfig } from "./list";

const styles = theme => ({
	inputRoot: {
		color: "inherit",
	},
});

class Task extends Component {
	render() {
		const { match, findAll, toggleSideBar, singleView } = this.props;

		return (
			<Container>
				<Route
					path={`${match.path}`}
					exact={singleView}
					render={props => (
						<Page>
							<AppBar>
								<Fragment>
									<MenuButton toggleSideBar={toggleSideBar} />
									<AppBarTitle>Tasks</AppBarTitle>

									<RefreshButton findAll={findAll} />
									<IconButton
										component={Link}
										to={`${match.path}/create`}
										color="inherit"
									>
										<Add />
									</IconButton>
								</Fragment>
							</AppBar>
							<List {...props} listURL={match.path} findAll={findAll} />
						</Page>
					)}
				/>
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
