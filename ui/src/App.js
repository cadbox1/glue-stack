import React from "react";
import { Router } from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { history } from "common/history";
import blue from "@material-ui/core/colors/blue";
import { Main } from "./main";
import CssBaseline from "@material-ui/core/CssBaseline";
import "./App.css";

const theme = createMuiTheme({
	palette: {
		primary: blue,
	},
});

const App = () => (
	<Router history={history}>
		<MuiThemeProvider theme={theme}>
			<CssBaseline />
			<Main />
		</MuiThemeProvider>
	</Router>
);

export default App;
