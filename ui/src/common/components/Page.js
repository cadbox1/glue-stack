import React, { Component } from "react";
import { Paper } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
	root: {
		width: "100%",
	},
});

class Page extends Component {
	render() {
		const { children, classes, ...props } = this.props;
		return (
			<Paper className={classes.root} square={true} {...props}>
				{children}
			</Paper>
		);
	}
}

Page = withStyles(styles)(Page);

export { Page };
