import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
	root: {
		display: "flex",
		width: "100%",
	},
});

class Container extends Component {
	render() {
		const { children, classes, ...props } = this.props;
		return (
			<div className={classes.root} {...props}>
				{children}
			</div>
		);
	}
}

Container = withStyles(styles)(Container);

export { Container };
