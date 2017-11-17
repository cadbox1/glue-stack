import React, { Component } from "react";
import { connect } from "api/connector";
import { authenticate, signOut } from "api/authentication";
import { Unauthenticated } from "./unauthenticated";
import { Main } from "./main";

class Authentication extends Component {
	componentDidMount() {
		this.props.authenticate.call();
	}

	signOut = () => {
		signOut();
		this.props.authenticate.call();
	};

	render() {
		const { authenticate } = this.props;
		if (!authenticate.fulfilled) {
			return <Unauthenticated authenticate={authenticate} />;
		}
		return <Main signOut={this.signOut} authenticate={authenticate} />;
	}
}

Authentication = connect({
	authenticate: {
		promise: authenticate,
	},
})(Authentication);

export { Authentication };
