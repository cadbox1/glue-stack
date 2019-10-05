// based on https://github.com/doczjs/docz/blob/master/core/gatsby-theme-docz/src/index.js

import React from "react";
import { ComponentsProvider, theme, useConfig } from "docz";
import components from "gatsby-theme-docz/src/components";
import defaultTheme from "gatsby-theme-docz/src/theme";
import { Styled, ThemeProvider } from "theme-ui";

import "bootstrap/dist/css/bootstrap.min.css";

const Theme = ({ children }) => {
	const config = useConfig();
	return (
		<ThemeProvider theme={config.themeConfig}>
			<ComponentsProvider components={{ ...components, page: null }}>
				<Styled.root>{children}</Styled.root>
			</ComponentsProvider>
		</ThemeProvider>
	);
};

export default theme(defaultTheme)(Theme);
