import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import Drawer from "./drawer";
import List, { ListItem, ListItemText } from "material-ui/List";
import Divider from "material-ui/Divider";

const overlaySidebar = false;

class Sidebar extends Component {
	render() {
		const { showSideBar } = this.props;
		const { signOut } = this.props;
		return (
			<div style={{ width: showSideBar ? "256px" : "0px" }}>
				<Drawer
					open={showSideBar}
					docked={!overlaySidebar}
					// onRequestChange={this.setShowSidebar}
				>
					<List>
						<ListItem button onClick={signOut}>
							<ListItemText primary="Sign Out" />
						</ListItem>
						<Divider />
						<Link to="/mytasks">
							<ListItem button>
								<ListItemText primary="My Tasks" />
							</ListItem>
						</Link>
						<Link to="/todo">
							<ListItem button>
								<ListItemText primary="Users" />
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
