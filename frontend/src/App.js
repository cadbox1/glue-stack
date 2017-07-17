import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import injectTapEventPlugin from "react-tap-event-plugin";
import Signup from "./signup";
import Main from "./main";
import "./App.css";

injectTapEventPlugin();

const App = () =>
	<HashRouter>
		<MuiThemeProvider>
			<Switch>
				<Route path="/signup" component={Signup} />
				<Route path="/" component={Main} />
			</Switch>
		</MuiThemeProvider>
	</HashRouter>;

export default App;
