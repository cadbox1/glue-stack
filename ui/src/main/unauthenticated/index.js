import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Card from "@material-ui/core/Card";
import { Signup } from "./signup";
import { Login } from "./login";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
	root: {
		maxWidth: "350px",
		marginRight: "auto",
		marginLeft: "auto",
	},
});

class Unauthenticated extends Component {
	render() {
		const { classes } = this.props;
		return (
			<Card className={classes.root}>
				<Switch>
					<Route
						path="/signup"
						render={props => <Signup {...props} {...this.props} />}
					/>
					<Route render={props => <Login {...props} {...this.props} />} />
				</Switch>
			</Card>
		);
	}
}

Unauthenticated = withStyles(styles)(Unauthenticated);

export { Unauthenticated };
