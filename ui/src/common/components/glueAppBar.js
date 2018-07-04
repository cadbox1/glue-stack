import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

class GlueAppBar extends Component {
	render() {
		const { children } = this.props;
		return (
			<AppBar position="static">
				<Toolbar>{children}</Toolbar>
			</AppBar>
		);
	}
}

export { GlueAppBar };

class GlueTitle extends Component {
	render() {
		const { children } = this.props;
		return (
			<Typography type="title" color="inherit" style={{ marginRight: "auto" }}>
				{children}
			</Typography>
		);
	}
}

export { GlueTitle };
