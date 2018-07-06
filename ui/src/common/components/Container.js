import React, { Component } from "react";

class Container extends Component {
	render() {
		const { children } = this.props;
		return <div style={{ display: "flex", width: "100%" }}>{children}</div>;
	}
}

export { Container };
