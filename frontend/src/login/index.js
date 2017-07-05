import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import {
	Card,
	CardActions,
	CardHeader,
	CardMedia,
	CardTitle,
	CardText,
} from "material-ui/Card";
import RaisedButton from "material-ui/RaisedButton";
import { Paper, TextField } from "material-ui";
import { observer } from "mobx-react";
import { PENDING } from "mobx-utils";
import currentUserStore from "common/currentUserStore";
import RefreshIndicator from "material-ui/RefreshIndicator";

@observer class Login extends Component {
	constructor(props) {
		super(props);
		this.state = { email: "", password: "" };
	}

	handleInput = evt => {
		this.setState({ [evt.currentTarget.name]: evt.currentTarget.value });
	};

	handleSubmit = evt => {
		evt.preventDefault();
		const { email, password } = this.state;
		currentUserStore.authenticate(email, password);
	};

	render() {
		const { email, password } = this.state;
		const user = currentUserStore.user;
		return (
			<div
				className="d-flex align-items-md-center justify-content-center"
				style={{ height: "100vh" }}
			>
				<div style={{ maxHeight: "100%", maxWidth: "450px" }}>
					<Card>
						<CardTitle
							title="Login"
							subtitle={<Link to="/signup">or Signup Here</Link>}
						/>
						<form onSubmit={this.handleSubmit}>
							<CardText>
								<TextField
									floatingLabelText="Email *"
									floatingLabelFixed
									name="email"
									value={email}
									onChange={this.handleInput}
									required
								/>
								<TextField
									floatingLabelText="Password *"
									floatingLabelFixed
									type="password"
									name="password"
									value={password}
									onChange={this.handleInput}
									required
								/>
								<CardActions>
									<RaisedButton
										label={
											user && user.state === PENDING
												? <RefreshIndicator
														left={0}
														top={0}
														size={20}
														status="loading"
													/>
												: "Login"
										}
										primary={true}
										type="submit"
									/>
								</CardActions>
							</CardText>
						</form>
					</Card>
				</div>
			</div>
		);
	}
}

export default withRouter(Login);
