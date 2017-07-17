import React, { Component } from "react";
import { observer } from "mobx-react";
import { Link, withRouter } from "react-router-dom";
import Drawer from "./drawer";
import List, { ListItem, ListItemText } from "material-ui/List";
import Divider from "material-ui/Divider";
import store from "./store";

import currentUserStore from "common/currentUserStore";

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
						<ListItem button onClick={this.signOut}>
							<ListItemText primary="Sign Out" />
						</ListItem>
						<Divider />
						<Link to="/todo">
							<ListItem button>
								<ListItemText primary="Me" />
							</ListItem>
						</Link>
						<Link to="/tasks">
							<ListItem button>
								<ListItemText primary="Tasks" />
							</ListItem>
						</Link>
					</List>
				</Drawer>
			</div>
		);
	}
}

export default withRouter(Sidebar);
