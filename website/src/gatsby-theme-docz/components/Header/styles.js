import * as mixins from "~utils/mixins";
import * as styles from "gatsby-theme-docz/src/components/Header/styles";
import { lighten } from "@theme-ui/color";

export const wrapper = styles.wrapper;
export const innerContainer = styles.innerContainer;
export const menuIcon = styles.menuIcon;
export const menuButton = styles.menuButton;
export const editButton = styles.editButton;

export const headerButton = {
	...mixins.centerAlign,
	outline: "none",
	p: "12px",
	border: "none",
	borderRadius: 9999,
	fontSize: 0,
	fontWeight: 600,
	cursor: "pointer",

	color: "white",
	bg: lighten("primary", 0.05),
	":hover": {
		bg: "primary",
	},
};
