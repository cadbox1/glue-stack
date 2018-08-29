import { Component } from "react";
import { history, replaceParams } from "common/history";

export const URLStateHolder = ({ children }) =>
	children({
		handleUpdate: replaceParams,
		params: history.location.query,
	});

export class StateHolder extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	handleUpdate = updatedState => {
		this.setState(currentState => ({ ...currentState, ...updatedState }));
	};
	render() {
		return this.props.children({
			handleUpdate: this.handleUpdate,
			params: { ...this.state },
		});
	}
}
