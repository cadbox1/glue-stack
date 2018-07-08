import React, { Component } from "react";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

class MenuButton extends Component {
	render() {
		const { toggleSideBar } = this.props;
		return (
			<IconButton onClick={toggleSideBar} color="inherit" aria-label="Menu">
				<MenuIcon />
			</IconButton>
		);
	}
}

export { MenuButton };
