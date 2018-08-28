import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Connect } from "common/components/Connect";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { TextField } from "common/components/TextField";
import { SaveButton } from "common/components/SaveButton";
import { save } from "api/organisation";

class Signup extends Component {
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
			<Card
				style={{ maxWidth: "350px", marginRight: "auto", marginLeft: "auto" }}
			>
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
						<SaveButton save={save}>Signup</SaveButton>
					</CardActions>
				</form>
			</Card>
		);
	}
}

Signup = withRouter(Signup);

const ConnectedSignup = props => (
	<Connect
		save={{
			promise: save,
		}}
	>
		{({ save }) => <Signup {...props} save={save} />}
	</Connect>
);

export { ConnectedSignup as Signup };
