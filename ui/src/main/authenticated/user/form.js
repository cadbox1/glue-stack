import React, { Component } from "react";
import { Link } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import Close from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";
import { Page } from "common/components/Page";
import { AppBar } from "common/components/AppBar";
import { AppBarTitle } from "common/components/AppBarTitle";
import { Form } from "common/components/Form";
import { TextField } from "common/components/TextField";
import { SaveButton } from "common/components/SaveButton";
import { findOne, save } from "api/user";
import { connect } from "common/connector";

class FormPage extends Component {
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
		const { save } = this.props;
		const { id, firstName, lastName, email, password } = this.state;
		return (
			<Page>
				<AppBar>
					<AppBarTitle>
						{id ? `${firstName} ${lastName}` : "Create"}
					</AppBarTitle>
					<IconButton component={Link} to="/users" color="inherit">
						<Close />
					</IconButton>
				</AppBar>
				<Form onSubmit={this.handleSubmit}>
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
						<div>
							<Button type="button" onClick={this.handleResetPassword}>
								Reset Password
							</Button>
						</div>
					)}
					<SaveButton save={save}>{id ? "Save" : "Create"}</SaveButton>
				</Form>
			</Page>
		);
	}
}

export default FormPage;

export const Create = connect({ save: { promise: save } })(FormPage);

export const Edit = connect({
	findOne: {
		params: props => props.match.params.id,
		promise: findOne,
	},
})(Create);
