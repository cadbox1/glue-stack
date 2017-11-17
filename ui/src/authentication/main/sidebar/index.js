import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import Drawer from "./drawer";
import List, { ListItem, ListItemIcon, ListItemText } from "material-ui/List";
import Avatar from "material-ui/Avatar";
import Collapse from "material-ui/transitions/Collapse";
import ExpandLess from "material-ui-icons/ExpandLess";
import ExpandMore from "material-ui-icons/ExpandMore";
import Divider from "material-ui/Divider";

class Sidebar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userMenuOpen: false,
		};
	}
	handleClick = evt => {
		this.setState({ userMenuOpen: !this.state.userMenuOpen });
	};
	render() {
		const { authenticate, showSideBar, signOut } = this.props;
		const { userMenuOpen } = this.state;
		const user = authenticate.value.data;
		return (
			<div style={{ width: showSideBar ? "256px" : "0px" }}>
				<Drawer
					open={showSideBar}
					type="persistent"
					// onRequestChange={this.setShowSidebar}
				>
					<List style={{ padding: 0 }}>
						<ListItem button onClick={this.handleClick}>
							<Avatar style={{ textTransform: "uppercase" }}>
								{user.firstName[0]}
							</Avatar>
							<ListItemText primary={`${user.firstName} ${user.lastName}`} />
							{userMenuOpen ? <ExpandLess /> : <ExpandMore />}
						</ListItem>
						<Collapse
							component="li"
							in={userMenuOpen}
							transitionDuration="auto"
							unmountOnExit
						>
							<List disablePadding>
								<ListItem button onClick={signOut}>
									<ListItemText inset primary="Sign Out" />
								</ListItem>
							</List>
						</Collapse>
						<Divider />
						<Link to="/me">
							<ListItem button>
								<ListItemText primary="Me" />
							</ListItem>
						</Link>
						<Link to="/tasks">
							<ListItem button>
								<ListItemText primary="Tasks" />
							</ListItem>
						</Link>
						<Link to="/users">
							<ListItem button>
								<ListItemText primary="Users" />
							</ListItem>
						</Link>
					</List>
				</Drawer>
			</div>
		);
	}
}

export default withRouter(Sidebar);
