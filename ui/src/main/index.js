import React, { Component } from "react";
import { Connect } from "common/components/Connect";
import { authenticate, signOut } from "api/authentication";
import { Unauthenticated } from "./unauthenticated";
import { Authenticated } from "./authenticated";

class Main extends Component {
	componentDidMount() {
		this.authenticate();
	}

	signOut = () => {
		signOut();
		this.authenticate();
	};

	authenticate() {
		const { authenticate } = this.props;
		authenticate.call().catch(() => authenticate.reset()); // swallow any errors
	}

	render() {
		const { authenticate } = this.props;
		if (!authenticate.fulfilled) {
			return <Unauthenticated authenticate={authenticate} />;
		}
		return <Authenticated signOut={this.signOut} authenticate={authenticate} />;
	}
}

const ConnectedMain = props => (
	<Connect
		authenticate={{
			promise: authenticate,
		}}
	>
		{({ authenticate }) => <Main {...props} authenticate={authenticate} />}
	</Connect>
);

export { ConnectedMain as Main };
