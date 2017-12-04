import React, { Component } from "react";
import { history, replaceParams } from "common/history";

export function urlStateHolder(WrappedComponent) {
	return class URLStateHolder extends Component {
		render() {
			return (
				<WrappedComponent
					{...this.props}
					handleUpdate={replaceParams}
					params={history.location.query}
				/>
			);
		}
	};
}

export function stateHolder(WrappedComponent) {
	return class StateHolder extends Component {
		constructor(props) {
			super(props);
			this.state = {};
		}
		handleUpdate = updatedState => {
			this.setState(currentState => ({ ...currentState, ...updatedState }));
		};
		render() {
			return (
				<WrappedComponent
					{...this.props}
					handleUpdate={this.handleUpdate}
					params={this.state}
				/>
			);
		}
	};
}
