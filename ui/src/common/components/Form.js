import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
	root: {
		...theme.mixins.gutters(),
	},
});

class Form extends Component {
	render() {
		const { children, classes, ...props } = this.props;
		return (
			<form className={classes.root} {...props}>
				{children}
			</form>
		);
	}
}

Form = withStyles(styles)(Form);

export { Form };
