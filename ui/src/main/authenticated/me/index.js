import React, { Component } from "react";
import { Page } from "common/components/Page";
import { AppBar } from "common/components/AppBar";
import { MenuButton } from "common/components/MenuButton";
import { AppBarTitle } from "common/components/AppBarTitle";
import { RefreshButton } from "common/components/RefreshButton";
import { URLStateHolder } from "common/components/StateHolder";
import { parsePaginationParameters } from "common/parsePaginationParameters";
import { Connect } from "common/components/Connect";
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

const ConnectedMe = props => {
	const { authenticate } = props;
	return (
		<URLStateHolder>
			{({ handleUpdate, params }) => (
				<Connect
					findAll={{
						handleUpdate,
						params: {
							...parsePaginationParameters(params),
							userId: authenticate.value.data.id,
						},
						promise: findAll,
					}}
				>
					{({ findAll }) => <Me {...props} findAll={findAll} />}
				</Connect>
			)}
		</URLStateHolder>
	);
};

export { ConnectedMe as Me };
