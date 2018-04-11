import React, { Component } from "react";
import { findOne, save } from "api/task";
import { connect } from "common/connector";
import { Link, Route, Switch } from "react-router-dom";
import AppBar from "material-ui/AppBar";
import IconButton from "material-ui/IconButton";
import Close from "material-ui-icons/Close";
import TextField from "common/components/TextField";
import Button from "material-ui/Button";
import Paper from "material-ui/Paper";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import { CircularProgress } from "material-ui/Progress";
import { TaskStatus } from "api/task";
import { stateHolder } from "common/stateHolder";
import { List, connectConfig } from "../user/list";

const ConnectedUserList = stateHolder(connect(connectConfig)(List));

class Form extends Component {
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
		const { className, match } = this.props;
		return (
			<Paper className={className} elevation={1}>
				<Switch>
					<Route
						path={`${match.url}/assign`}
						render={props => (
							<div>
								<AppBar position="static">
									<Toolbar>
										<Typography
											type="title"
											color="inherit"
											className="mr-auto"
										>
											{`${id ? name : "Create"} > Assign`}
										</Typography>
										<Link to={match.url}>
											<IconButton color="contrast">
												<Close />
											</IconButton>
										</Link>
									</Toolbar>
								</AppBar>
								<ConnectedUserList
									{...props}
									onSelect={this.handleSelectUser}
								/>
							</div>
						)}
					/>
					<Route
						render={props => (
							<div>
								<AppBar position="static">
									<Toolbar>
										<Typography
											type="title"
											color="inherit"
											className="mr-auto"
										>
											{id ? name : "Create"}
										</Typography>
										<Link to={`/tasks`}>
											<IconButton color="contrast">
												<Close />
											</IconButton>
										</Link>
									</Toolbar>
								</AppBar>
								<form onSubmit={this.handleSubmit} className="container-fluid">
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

									<TextField
										value={
											user ? `${user.firstName} ${user.lastName}`.trim() : ""
										}
										label="Assigned"
										className=""
										disabled
									/>
									<Link to={`${match.url}/assign`}>Assign</Link>
									<Button
										raised
										className="d-block"
										type="submit"
										color="primary"
									>
										{save.pending ? (
											<CircularProgress size={15} />
										) : id ? (
											"Save"
										) : (
											"Create"
										)}
									</Button>
								</form>
							</div>
						)}
					/>
				</Switch>
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
