import React, { Component } from "react";
import { MenuButton } from "common/components/menuButton";
import { GlueAppBar, GlueTitle } from "common/components/glueAppBar";
import { RefreshButton } from "common/components/refreshButton";
import { urlStateHolder } from "common/stateHolder";
import { parseURL } from "common/parseURL";
import { connect } from "common/connector";
import { findAll } from "api/task";
import { List } from "../task/list";
import { GluePage } from "common/components/gluePage";

class Me extends Component {
	render() {
		const { findAll, toggleSideBar } = this.props;
		return (
			<GluePage>
				<GlueAppBar>
					<MenuButton toggleSideBar={toggleSideBar} />
					<GlueTitle>Me</GlueTitle>
					<RefreshButton findAll={findAll} />
				</GlueAppBar>
				<List findAll={findAll} />
			</GluePage>
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
