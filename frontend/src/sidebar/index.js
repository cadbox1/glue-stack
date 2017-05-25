import React, { Component } from "react";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";
import { Drawer, List, ListItem, Divider, Avatar } from "material-ui";
import store from "./store";

const overlaySidebar = false;

@observer class Sidebar extends Component {
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
								<ListItem key={2} primaryText="Sign out" />,
							]}
						/>
						<Divider />
						<Link to="/todo">
							<ListItem primaryText="Todo" />
						</Link>
					</List>
				</Drawer>
			</div>
		);
	}
}

export default Sidebar;
