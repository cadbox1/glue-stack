import React from "react";
import Drawer from "@material-ui/core/Drawer";
import { withStyles } from "@material-ui/core/styles";

const styles = {
	paper: {
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
