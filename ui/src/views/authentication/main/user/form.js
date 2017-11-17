import React, { Component } from "react";
import { Link } from "react-router-dom";
import AppBar from "material-ui/AppBar";
import IconButton from "material-ui/IconButton";
import Close from "material-ui-icons/Close";
import TextField from "common/TextField";
import Button from "material-ui/Button";
import Paper from "material-ui/Paper";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import { CircularProgress } from "material-ui/Progress";
import { findOne, save } from "api/user";
import { connect } from "api/connector";

class Form extends Component {
	constructor(props) {
		super(props);
		this.state = this.defaultState;
		if (props.match.params.id) {
			// eslint-disable-next-line
			this.state.password = undefined;
		}
	}

	defaultState = {
		id: null,
		firstName: "",
		lastName: "",
		email: "",
		password: "",
	};

	componentDidMount() {
		if (this.props.findOne) {
			this.props.findOne.subscribe(value => {
				const { id, firstName, lastName, email } = value.data;
				this.setState({ id, firstName, lastName, email });
			});
		}
	}

	handleSubmit = evt => {
		evt.preventDefault();
		const { save, refreshList, history } = this.props;
		save.call(this.state).then(result => {
			if (refreshList) {
				refreshList();
			}
			if (!this.state.id) {
				history.push(`/users/${result.data.id}`);
			}
		});
	};

	handleFormInput = evt => {
		this.setState({ [evt.target.name]: evt.target.value });
	};

	handleResetPassword = evt => {
		this.setState({ password: "" });
	};

	render() {
		const { id, firstName, lastName, email, password } = this.state;
		const { className } = this.props;
		return (
			<Paper className={className} elevation={1}>
				<AppBar position="static">
					<Toolbar>
						<Typography type="title" color="inherit" className="mr-auto">
							{id ? `${firstName} ${lastName}` : "Create"}
						</Typography>
						<Link to={`/users`}>
							<IconButton color="contrast">
								<Close />
							</IconButton>
						</Link>
					</Toolbar>
				</AppBar>
				<form onSubmit={this.handleSubmit} className="container-fluid">
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
						required
					/>
					{password !== undefined ? (
						<TextField
							name="password"
							type="password"
							value={password}
							onChange={this.handleFormInput}
							label="Password"
							required
						/>
					) : (
						<Button type="button" onClick={this.handleResetPassword}>
							Reset Password
						</Button>
					)}
					<Button raised className="d-block" type="submit" color="primary">
						{save.pending ? (
							<CircularProgress size={15} />
						) : id ? (
							"Save"
						) : (
							"Create"
						)}
					</Button>
				</form>
			</Paper>
		);
	}
}

export default Form;

export const Create = connect({ save: { promise: save } })(Form);

export const Edit = connect({
	findOne: {
		params: props => props.match.params.id,
		promise: findOne,
	},
})(Create);
