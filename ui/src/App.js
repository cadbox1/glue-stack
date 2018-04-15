import React from "react";
import { Router } from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from "material-ui/styles";
import { history } from "common/history";
import blue from "material-ui/colors/blue";
import { Main } from "./main";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

const theme = createMuiTheme({
	palette: {
		primary: blue,
	},
});

const App = () => (
	<Router history={history}>
		<MuiThemeProvider theme={theme}>
			<Main />
		</MuiThemeProvider>
	</Router>
);

export default App;
