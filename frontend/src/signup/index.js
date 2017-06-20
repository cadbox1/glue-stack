import React, { Component } from "react";
import { observer } from "mobx-react";
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

import OrganisationStore from "../store/OrganisationStore";

@observer class Signup extends Component {
	constructor(props) {
		super(props);
		this.organisation = OrganisationStore.create();
	}

	handleOrganisationInput = evt => {
		this.organisation[evt.currentTarget.name] = evt.currentTarget.value;
	};

	handleUserInput = evt => {
		this.organisation.user[evt.currentTarget.name] = evt.currentTarget.value;
	};

	handleSubmit = evt => {
		evt.preventDefault();
		this.organisation.save().then(
			() => this.props.history.push("/"),
			error => {
				debugger;
			}
		);
	};

	render() {
		const { organisation } = this;
		const { user } = organisation;
		return (
			<div className="d-flex align-items-md-center justify-content-center h-100">
				<Card style={{ maxWidth: "500px" }}>
					<CardTitle
						title="Signup"
						subtitle={<Link to="/login">or Login Here</Link>}
					/>
					<form onSubmit={this.handleSubmit}>
						<CardText>
							<TextField
								name="name"
								value={organisation.name}
								onChange={this.handleOrganisationInput}
								floatingLabelText="Organisation *"
								floatingLabelFixed
								required
							/>
							<TextField
								name="firstName"
								value={user.firstName}
								onChange={this.handleUserInput}
								floatingLabelText="First Name *"
								floatingLabelFixed
								required
							/>
							<TextField
								name="lastName"
								value={user.lastName}
								onChange={this.handleUserInput}
								floatingLabelText="Last Name *"
								floatingLabelFixed
								required
							/>
							<TextField
								name="email"
								value={user.email}
								onChange={this.handleUserInput}
								floatingLabelText="Email *"
								floatingLabelFixed
								required
							/>
							<TextField
								name="password"
								value={user.password}
								onChange={this.handleUserInput}
								floatingLabelText="Password *"
								floatingLabelFixed
								type="password"
								required
							/>
							<CardActions>
								<RaisedButton label="Signup" primary={true} type="submit" />
							</CardActions>
						</CardText>
					</form>
				</Card>
			</div>
		);
	}
}

export default withRouter(Signup);
