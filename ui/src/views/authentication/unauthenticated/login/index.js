import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import Card, { CardActions, CardContent } from "material-ui/Card";
import Typography from "material-ui/Typography";
import TextField from "common/TextField";
import { CircularProgress } from "material-ui/Progress";
import Button from "material-ui/Button";

export class Login extends Component {
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
			<div
				className="d-flex align-items-md-center justify-content-center"
				style={{ height: "100vh" }}
			>
				<div style={{ maxHeight: "100%", maxWidth: "350px" }} className="w-100">
					<Card>
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
								<Button raised color="primary" type="submit">
									{authenticate.pending ? (
										<CircularProgress size={15} />
									) : (
										"Login"
									)}
								</Button>
							</CardActions>
						</form>
					</Card>
				</div>
			</div>
		);
	}
}

export default withRouter(Login);
