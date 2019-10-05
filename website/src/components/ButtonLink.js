import React from "react";
import styled from "@emotion/styled";
import { useConfig } from "docz";
import { lighten } from "@theme-ui/color";

const ButtonLinkStyled = styled("a")`
	display: inline-block;
	border-radius: 0.25rem;
	background-color: ${props =>
		lighten(props.theme.themeConfig.colors.primary, 0.05)};
	color: ${props => props.theme.themeConfig.colors.white};
	padding: 0.75rem 1.25rem;
	text-decoration: none;

	&:hover {
		background-color: ${props => props.theme.themeConfig.colors.primary};
		color: ${props => props.theme.themeConfig.colors.white};
		text-decoration: none;
	}
`;

export const ButtonLink = ({ children, ...props }) => {
	const config = useConfig();
	return (
		<ButtonLinkStyled theme={config} {...props}>
			{children}
		</ButtonLinkStyled>
	);
};
