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
import { Paper } from "material-ui";
import TextField from "common/TextField";

import OrganisationStore from "../store/OrganisationStore";

@observer
class Signup extends Component {
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
				<div style={{ maxHeight: "100%", maxWidth: "450px" }}>
					<Card>
						<CardTitle
							title="Signup"
							subtitle={<Link to="/">or Login Here</Link>}
						/>
						<form onSubmit={this.handleSubmit}>
							<CardText>
								<TextField
									name="name"
									value={organisation.name}
									onChange={this.handleOrganisationInput}
									floatingLabelText="Organisation *"
									required
								/>
								<TextField
									name="firstName"
									value={user.firstName}
									onChange={this.handleUserInput}
									floatingLabelText="First Name *"
									required
								/>
								<TextField
									name="lastName"
									value={user.lastName}
									onChange={this.handleUserInput}
									floatingLabelText="Last Name *"
									required
								/>
								<TextField
									name="email"
									value={user.email}
									onChange={this.handleUserInput}
									floatingLabelText="Email *"
									required
								/>
								<TextField
									name="password"
									value={user.password}
									onChange={this.handleUserInput}
									floatingLabelText="Password *"
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
			</div>
		);
	}
}

export default withRouter(Signup);
