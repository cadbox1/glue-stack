import React from "react";
import Drawer from "material-ui/Drawer";
import { withStyles, createStyleSheet } from "material-ui/styles";

const styleSheet = createStyleSheet("OverridesClasses", {
	paper: {
		position: "static",
		width: "256px",
	},
});

function OverridesClasses({ classes, children, ...props }) {
	return (
		<Drawer
			classes={{
				paper: classes.paper,
			}}
			{...props}
		>
			{children}
		</Drawer>
	);
}

export default withStyles(styleSheet)(OverridesClasses);
