import React, { Component } from "react";
import { observer } from "mobx-react";
import { Link, withRouter } from "react-router-dom";
import { Drawer, List, ListItem, Divider, Avatar } from "material-ui";
import store from "./store";

import currentUserStore from "../common/currentUserStore";

const overlaySidebar = false;

@observer
class Sidebar extends Component {
	signOut = () => {
		currentUserStore.signOut();
	};

	render() {
		return (
			<div style={{ width: store.showSidebar ? "256px" : "0px" }}>
				<Drawer
					open={store.showSidebar}
					docked={!overlaySidebar}
					// onRequestChange={this.setShowSidebar}
				>
					<List>
						<ListItem
							primaryText="Cadell Christo"
							leftAvatar={<Avatar src="" />}
							primaryTogglesNestedList={true}
							nestedItems={[
								<ListItem key={1} primaryText="My Profile" />,
								<ListItem
									key={2}
									primaryText="Sign out"
									onClick={this.signOut}
								/>,
							]}
						/>
						<Divider />
						<Link to="/todo">
							<ListItem primaryText="Todo" />
						</Link>
						<Link to="/tasks">
							<ListItem primaryText="Tasks" />
						</Link>
					</List>
				</Drawer>
			</div>
		);
	}
}

export default withRouter(Sidebar);
