import React, { Component } from "react";
import { Page } from "common/components/Page";
import { AppBar } from "common/components/AppBar";
import { MenuButton } from "common/components/MenuButton";
import { AppBarTitle } from "common/components/AppBarTitle";
import { RefreshButton } from "common/components/RefreshButton";
import { urlStateHolder } from "common/stateHolder";
import { parseURL } from "common/parseURL";
import { connect } from "common/connector";
import { findAll } from "api/task";
import { List } from "../task/list";

class Me extends Component {
	render() {
		const { findAll, toggleSideBar } = this.props;
		return (
			<Page>
				<AppBar>
					<MenuButton toggleSideBar={toggleSideBar} />
					<AppBarTitle>Me</AppBarTitle>
					<RefreshButton findAll={findAll} />
				</AppBar>
				<List findAll={findAll} />
			</Page>
		);
	}
}

const ConnectedMe = urlStateHolder(
	connect({
		findAll: {
			params: props => ({
				...parseURL(props),
				userId: props.authenticate.value.data.id,
			}),
			promise: findAll,
		},
	})(Me)
);

export { ConnectedMe as Me };
