import React, { Component } from "react";
import MaterialAppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

class AppBar extends Component {
	render() {
		const { children, ...props } = this.props;
		return (
			<MaterialAppBar position="static" {...props}>
				<Toolbar>{children}</Toolbar>
			</MaterialAppBar>
		);
	}
}

export { AppBar };
