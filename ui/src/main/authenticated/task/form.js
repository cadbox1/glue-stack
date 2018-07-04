import React, { Component } from "react";
import { findOne, save } from "api/task";
import { connect } from "common/connector";
import { Link, Route, Switch } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import Close from "@material-ui/icons/Close";
import TextField from "common/components/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { TaskStatus } from "api/task";
import { stateHolder } from "common/stateHolder";
import { List, connectConfig } from "../user/list";
import { GlueAppBar, GlueTitle } from "common/components/glueAppBar";
import { withStyles } from "@material-ui/core/styles";

const ConnectedUserList = stateHolder(connect(connectConfig)(List));

const styles = theme => ({
	root: {
		...theme.mixins.gutters(),
	},
});

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
		const { classes, match } = this.props;
		return (
			<Switch>
				<Route
					path={`${match.url}/assign`}
					render={props => (
						<div>
							<GlueAppBar>
								<GlueTitle>{`${id ? name : "Create"} > Assign`}</GlueTitle>
								<IconButton component={Link} to={match.url} color="inherit">
									<Close />
								</IconButton>
							</GlueAppBar>
							<ConnectedUserList {...props} onSelect={this.handleSelectUser} />
						</div>
					)}
				/>
				<Route
					render={props => (
						<div>
							<GlueAppBar>
								<GlueTitle>{id ? name : "Create"}</GlueTitle>
								<IconButton component={Link} to="/tasks" color="inherit">
									<Close />
								</IconButton>
							</GlueAppBar>

							<form onSubmit={this.handleSubmit} className={classes.root}>
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
								<Button
									variant="contained"
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
		);
	}
}

Form = withStyles(styles)(Form);

export default Form;

export const Create = connect({ save: { promise: save } })(Form);

export const Edit = connect({
	findOne: {
		params: props => props.match.params.id,
		promise: findOne,
	},
})(Create);
