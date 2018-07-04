import React, { Component } from "react";
import { Paper } from "@material-ui/core";

class GluePage extends Component {
	render() {
		const { children } = this.props;
		return <Paper style={{ width: "100%" }}>{children}</Paper>;
	}
}
export { GluePage };
