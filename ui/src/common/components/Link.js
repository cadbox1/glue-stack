import React, { Component } from "react";
import { Link as ReactRouterLink, withRouter } from "react-router-dom";

class Link extends Component {
	render() {
		const {
			location,
			preserveParams = true,
			to,
			staticContext,
			...props
		} = this.props;

		let preparedTo = to;
		if (preserveParams) {
			preparedTo += location.search;
		}

		return <ReactRouterLink {...props} to={preparedTo} />;
	}
}

Link = withRouter(Link);

export { Link };
