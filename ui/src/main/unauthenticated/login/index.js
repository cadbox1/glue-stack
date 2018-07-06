import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { TextField } from "common/components/TextField";
import { SaveButton } from "common/components/SaveButton";

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = { email: "", password: "" };
	}

	handleInput = evt => {
		this.setState({
			[evt.target.name]: evt.target.value,
		});
		const { authenticate } = this.props;
		if (authenticate.rejected) {
			authenticate.reset();
		}
	};

	handleSubmit = evt => {
		evt.preventDefault();
		const { email, password } = this.state;
		const { authenticate } = this.props;
		authenticate.call({ username: email, password });
	};

	render() {
		const { email, password } = this.state;
		const { authenticate } = this.props;

		const invalidLogin =
			authenticate.rejected &&
			authenticate.reason &&
			authenticate.reason.response &&
			authenticate.reason.response.status === 401;

		return (
			<form onSubmit={this.handleSubmit}>
				<CardContent>
					<Typography type="headline" component="h2">
						Login
					</Typography>
					<Typography type="body1">
						<Link to="/signup">or Signup Here</Link>
					</Typography>
					<TextField
						label="Email"
						name="email"
						value={email}
						error={authenticate.rejected}
						onChange={this.handleInput}
						required
					/>
					<TextField
						label="Password"
						type="password"
						name="password"
						value={password}
						error={authenticate.rejected}
						helperText={
							(invalidLogin && "Invalid Username or Password") ||
							(authenticate.reason && authenticate.reason.message)
						}
						onChange={this.handleInput}
						required
					/>
				</CardContent>
				<CardActions>
					<SaveButton save={authenticate}>Login</SaveButton>
				</CardActions>
			</form>
		);
	}
}

Login = withRouter(Login);

export { Login };
