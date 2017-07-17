import React, { Component } from "react";
import { observer } from "mobx-react";
import { Link, withRouter } from "react-router-dom";
import Card, { CardActions, CardContent } from "material-ui/Card";
import Typography from "material-ui/Typography";
import TextField from "common/TextField";
import Button from "material-ui/Button";

import OrganisationStore from "store/OrganisationStore";

@observer
class Signup extends Component {
	constructor(props) {
		super(props);
		this.organisation = OrganisationStore.create();
	}

	handleOrganisationInput = evt => {
		this.organisation[evt.target.name] = evt.target.value;
	};

	handleUserInput = evt => {
		this.organisation.user[evt.target.name] = evt.target.value;
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
									value={organisation.name}
									onChange={this.handleOrganisationInput}
									label="Organisation"
									required
									marginForm
								/>
								<TextField
									name="firstName"
									value={user.firstName}
									onChange={this.handleUserInput}
									label="First Name"
									required
									marginForm
								/>
								<TextField
									name="lastName"
									value={user.lastName}
									onChange={this.handleUserInput}
									label="Last Name"
									required
									marginForm
								/>
								<TextField
									name="email"
									value={user.email}
									onChange={this.handleUserInput}
									label="Email"
									required
									marginForm
								/>
								<TextField
									name="password"
									value={user.password}
									onChange={this.handleUserInput}
									label="Password"
									type="password"
									required
									marginForm
								/>
							</CardContent>
							<CardActions>
								<Button raised color="primary" type="submit">
									Signup
								</Button>
							</CardActions>
						</form>
					</Card>
				</div>
			</div>
		);
	}
}

export default withRouter(Signup);
