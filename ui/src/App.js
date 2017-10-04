import React from "react";
import { Router } from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from "material-ui/styles";
import injectTapEventPlugin from "react-tap-event-plugin";
import { history } from "common/history";
import { Authentication } from "./authentication";
import "./App.css";

injectTapEventPlugin();

const theme = createMuiTheme();

const App = () => (
	<Router history={history}>
		<MuiThemeProvider theme={theme}>
			<Authentication />
		</MuiThemeProvider>
	</Router>
);

export default App;
