import React from "react";
import { Router } from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from "material-ui/styles";
import injectTapEventPlugin from "react-tap-event-plugin";
import { history } from "common/history";
import blue from "material-ui/colors/blue";
import { Authentication } from "./views/authentication";
import "./App.css";

injectTapEventPlugin();

const theme = createMuiTheme({
	palette: {
		primary: blue,
	},
});

const App = () => (
	<Router history={history}>
		<MuiThemeProvider theme={theme}>
			<Authentication />
		</MuiThemeProvider>
	</Router>
);

export default App;
