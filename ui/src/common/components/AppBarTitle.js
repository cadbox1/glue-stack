import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
	root: {
		marginRight: "auto",
	},
});

class AppBarTitle extends Component {
	render() {
		const { children, classes, ...props } = this.props;
		return (
			<Typography
				className={classes.root}
				type="title"
				color="inherit"
				{...props}
			>
				{children}
			</Typography>
		);
	}
}

AppBarTitle = withStyles(styles)(AppBarTitle);

export { AppBarTitle };
