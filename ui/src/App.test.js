import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Promise from "promise";
import localStorage from "mock-local-storage";

global.Promise = Promise;

it("renders without crashing", () => {
	const div = document.createElement("div");
	ReactDOM.render(<App />, div);
});
