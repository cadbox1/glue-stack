import React from "react";
import { Router } from "react-router-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import injectTapEventPlugin from "react-tap-event-plugin";
import { history } from "common/history";
import { Authentication } from "./authentication";
import "./App.css";

injectTapEventPlugin();

const App = () =>
	<Router history={history}>
		<MuiThemeProvider>
			<Authentication />
		</MuiThemeProvider>
	</Router>;

export default App;
