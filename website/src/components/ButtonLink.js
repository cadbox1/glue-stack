/** @jsx jsx */
import { jsx } from "theme-ui";
import { lighten, darken } from "@theme-ui/color";

export const buttonLinkStyle = {
	display: "inline-block",
	borderRadius: "0.3rem",
	py: 2,
	px: 3,
	textDecoration: "none",
};

export const variants = {
	primary: {
		color: "white",
		bg: lighten("primary", 0.05),
		":hover": {
			bg: "primary",
		},
	},
	secondary: {
		color: "black",
		border: "1px solid grey",
		bg: "white",
		":hover": {
			bg: darken("white", 0.05),
		},
	},
};

export const ButtonLink = ({
	sx = {},
	variant = "secondary",
	children,
	...props
}) => {
	const variantStyle = variants[variant];
	return (
		<a sx={{ ...buttonLinkStyle, ...variantStyle, ...sx }} {...props}>
			{children}
		</a>
	);
};
