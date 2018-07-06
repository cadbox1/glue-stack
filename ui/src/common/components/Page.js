import React, { Component } from "react";
import { Paper } from "@material-ui/core";

class Page extends Component {
	render() {
		const { children } = this.props;
		return <Paper style={{ width: "100%" }}>{children}</Paper>;
	}
}
export { Page };
