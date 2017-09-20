import React from "react";
import { withRouter } from "react-router-dom";

let RenderContextView = ({ match, location, children, ...props }) => {
	const isLargeScreen = true;
	const levels = (location.pathname
		.replace(match.url, "")
		.match(new RegExp("/", "g")) || []).length;
	const maxLevels = isLargeScreen ? 2 : 1;
	if (0 <= levels - maxLevels) {
		return false;
	}
	delete props.history;
	delete props.staticContext;
	return (
		<div {...props}>
			{children}
		</div>
	);
};

RenderContextView = withRouter(RenderContextView);

export { RenderContextView };
