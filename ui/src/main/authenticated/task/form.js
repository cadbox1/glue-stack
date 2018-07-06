import React, { Component, Fragment } from "react";
import { findOne, save } from "api/task";
import { Link, Route, Switch } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import Close from "@material-ui/icons/Close";
import { Page } from "common/components/Page";
import { AppBar } from "common/components/AppBar";
import { AppBarTitle } from "common/components/AppBarTitle";
import { Form } from "common/components/Form";
import { TextField } from "common/components/TextField";
import { SaveButton } from "common/components/SaveButton";
import { connect } from "common/connector";
import { stateHolder } from "common/stateHolder";
import { TaskStatus } from "api/task";
import { List, connectConfig } from "../user/list";

const ConnectedUserList = stateHolder(connect(connectConfig)(List));

class FormPage extends Component {
	constructor(props) {
		super(props);
		this.state = this.defaultState;
	}

	defaultState = {
		id: null,
		name: "",
		notes: "",
		user: null,
	};

	componentDidMount() {
		if (this.props.findOne) {
			this.props.findOne.subscribe(value => {
				const { id, name, notes, user } = value.data;
				this.setState({ id, name, notes, user });
			});
		}
	}

	handleSubmit = evt => {
		evt.preventDefault();
		const { save, refreshList, history } = this.props;
		const body = { ...this.state };
		body.statusId = TaskStatus.TODO;
		if (body.user) {
			body.user = { id: body.user.id };
		}
		save.call(body).then(result => {
			if (refreshList) {
				refreshList();
			}
			if (!this.state.id) {
				history.push(`/tasks/${result.data.id}`);
			}
		});
	};

	handleFormInput = evt => {
		this.setState({ [evt.target.name]: evt.target.value });
	};

	handleSelectUser = user => {
		this.setState({ user });
		this.props.history.goBack();
	};

	render() {
		const { id, name, notes, user } = this.state;
		const { match } = this.props;
		return (
			<Page>
				<Switch>
					<Route
						path={`${match.url}/assign`}
						render={props => (
							<Fragment>
								<AppBar>
									<AppBarTitle>{`${
										id ? name : "Create"
									} > Assign`}</AppBarTitle>
									<IconButton component={Link} to={match.url} color="inherit">
										<Close />
									</IconButton>
								</AppBar>
								<ConnectedUserList
									{...props}
									onSelect={this.handleSelectUser}
								/>
							</Fragment>
						)}
					/>
					<Route
						render={props => (
							<Fragment>
								<AppBar>
									<AppBarTitle>{id ? name : "Create"}</AppBarTitle>
									<IconButton component={Link} to="/tasks" color="inherit">
										<Close />
									</IconButton>
								</AppBar>

								<Form onSubmit={this.handleSubmit}>
									<TextField
										name="name"
										value={name}
										onChange={this.handleFormInput}
										label="Name"
										required
									/>
									<TextField
										name="notes"
										value={notes}
										onChange={this.handleFormInput}
										label="Notes"
									/>
									<div>
										<TextField
											value={
												user ? `${user.firstName} ${user.lastName}`.trim() : ""
											}
											label="Assigned"
											className=""
											disabled
											dBlock={false}
										/>
										<Link to={`${match.url}/assign`}>Assign</Link>
									</div>
									<SaveButton save={save}>{id ? "Save" : "Create"}</SaveButton>
								</Form>
							</Fragment>
						)}
					/>
				</Switch>
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
