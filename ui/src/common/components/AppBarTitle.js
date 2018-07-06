import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";

class AppBarTitle extends Component {
	render() {
		const { children } = this.props;
		return (
			<Typography type="title" color="inherit" style={{ marginRight: "auto" }}>
				{children}
			</Typography>
		);
	}
}

export { AppBarTitle };
