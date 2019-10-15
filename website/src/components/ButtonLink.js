/** @jsx jsx */
import { jsx } from "theme-ui";
import { lighten } from "@theme-ui/color";

export const buttonLinkStyle = {
	display: "inline-block",
	borderRadius: "0.3rem",
	color: "white",
	py: 2,
	px: 3,
	textDecoration: "none",
	bg: lighten("primary", 0.05),
	":hover": {
		bg: "primary",
	},
};

export const ButtonLink = ({ children, ...props }) => {
	return (
		<a sx={buttonLinkStyle} {...props}>
			{children}
		</a>
	);
};
