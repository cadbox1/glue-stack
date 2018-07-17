import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import Drawer from "./drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Divider from "@material-ui/core/Divider";

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
		const { authenticate, showSideBar, signOut, temporaryDock } = this.props;
		const { userMenuOpen } = this.state;
		const user = authenticate.value.data;

		return (
			<Drawer
				open={showSideBar}
				variant={temporaryDock ? "temporary" : "persistent"}
				style={{ width: showSideBar ? "256px" : "0px" }}
				onClose={this.props.toggleSideBar}
			>
				<List style={{ padding: 0 }}>
					<ListItem button onClick={this.handleClick}>
						<Avatar style={{ textTransform: "uppercase" }}>
							{user.firstName[0]}
						</Avatar>
						<ListItemText primary={`${user.firstName} ${user.lastName}`} />
						{userMenuOpen ? <ExpandLess /> : <ExpandMore />}
					</ListItem>
					<Collapse component="li" in={userMenuOpen} unmountOnExit>
						<List disablePadding>
							<ListItem
								component="a"
								href="https://cadbox1.github.io/glue-stack"
								target="_blank"
								button
							>
								<ListItemText primary="Open Website" inset />
							</ListItem>
							<ListItem onClick={signOut} button>
								<ListItemText primary="Sign Out" inset />
							</ListItem>
						</List>
					</Collapse>
					<Divider />
					<ListItem component={Link} to="/me" button>
						<ListItemText primary="Me" />
					</ListItem>
					<ListItem component={Link} to="/tasks" button>
						<ListItemText primary="Tasks" />
					</ListItem>
					<ListItem component={Link} to="/users" button>
						<ListItemText primary="Users" />
					</ListItem>
				</List>
			</Drawer>
		);
	}
}

Sidebar = withRouter(Sidebar);

export { Sidebar };
