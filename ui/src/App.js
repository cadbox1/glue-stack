import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import injectTapEventPlugin from "react-tap-event-plugin";
import { history } from "common/history";
import Signup from "./signup";
import Main from "./main";
import "./App.css";

injectTapEventPlugin();

const App = () =>
	<Router history={history}>
		<MuiThemeProvider>
			<Switch>
				<Route path="/signup" component={Signup} />
				<Route path="/" component={Main} />
			</Switch>
		</MuiThemeProvider>
	</Router>;

export default App;
