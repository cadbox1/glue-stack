import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "api/connector";
import Card, { CardActions, CardContent } from "material-ui/Card";
import Typography from "material-ui/Typography";
import { CircularProgress } from "material-ui/Progress";
import TextField from "common/TextField";
import Button from "material-ui/Button";
import { save } from "api/organisation";

export class Signup extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
			firstName: "",
			lastName: "",
			email: "",
			password: "",
		};
	}

	handleFormInput = evt => {
		this.setState({
			[evt.target.name]: evt.target.value,
		});
		const { save } = this.props;
		if (save.rejected) {
			this.props.save.reset();
		}
	};

	handleSubmit = evt => {
		evt.preventDefault();
		const { save } = this.props;
		const { name, firstName, lastName, email, password } = this.state;
		const body = { name, users: [{ firstName, lastName, email, password }] };
		save
			.call(body)
			.then(() => this.props.authenticate.call({ username: email, password }))
			.then(() => this.props.history.push("/"));
	};

	render() {
		const { save } = this.props;
		const { name, firstName, lastName, email, password } = this.state;

		const emailNotUnique =
			save.rejected &&
			save.reason.response &&
			save.reason.response.data.errors &&
			Array.isArray(save.reason.response.data.errors) &&
			save.reason.response.data.errors.some(
				error => error.code === "UniqueEmailConstraint"
			);

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
									Signup
								</Typography>
								<Typography type="body1">
									<Link to="/">or Login Here</Link>
								</Typography>
								<TextField
									name="name"
									value={name}
									onChange={this.handleFormInput}
									label="Organisation"
									required
								/>
								<TextField
									name="firstName"
									value={firstName}
									onChange={this.handleFormInput}
									label="First Name"
									required
								/>
								<TextField
									name="lastName"
									value={lastName}
									onChange={this.handleFormInput}
									label="Last Name"
									required
								/>
								<TextField
									name="email"
									value={email}
									onChange={this.handleFormInput}
									label="Email"
									error={emailNotUnique}
									helperText={emailNotUnique && "That email is already taken"}
									required
								/>
								<TextField
									name="password"
									value={password}
									onChange={this.handleFormInput}
									label="Password"
									type="password"
									required
								/>
							</CardContent>
							<CardActions>
								<Button raised color="primary" type="submit">
									{save.pending ? <CircularProgress size={15} /> : "Signup"}
								</Button>
							</CardActions>
						</form>
					</Card>
				</div>
			</div>
		);
	}
}

export default connect({
	save: {
		promise: save,
	},
})(withRouter(Signup));
