import React from "react";
import Drawer from "material-ui/Drawer";
import { withStyles } from "material-ui/styles";

const styles = {
	paper: {
		position: "static",
		width: "256px",
	},
};

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

export default withStyles(styles)(OverridesClasses);
