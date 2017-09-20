import React, { Component } from "react";
import { findOne, save } from "api/task";
import { connect } from "api/connector";
import { Link, Route } from "react-router-dom";
import AppBar from "material-ui/AppBar";
import IconButton from "material-ui/IconButton";
import Close from "material-ui-icons/Close";
import TextField from "common/TextField";
import Button from "material-ui/Button";
import Paper from "material-ui/Paper";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import { CircularProgress } from "material-ui/Progress";
import { ConnectedUserList } from "user/list";
import { RenderContextView } from "common/renderContextView";

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
				const { id, name, notes } = value.data;
				this.setState({ id, name, notes });
			});
		}
	}

	handleSubmit = evt => {
		evt.preventDefault();
		const { save, refreshList, history } = this.props;
		save.promise(this.state).then(result => {
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

	render() {
		const { id, name, notes } = this.state;
		const { className, match } = this.props;
		return (
			<Paper className={className} elevation={1}>
				<div className="row no-gutters">
					<RenderContextView className="col h-100vh">
						<AppBar position="static">
							<Toolbar>
								<Typography type="title" className="mr-auto">
									{id ? name : "Create"}
								</Typography>
								<Link to={`/tasks`}>
									<IconButton>
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
								marginForm
							/>
							<TextField
								name="notes"
								value={notes}
								onChange={this.handleFormInput}
								label="Notes"
								marginForm
							/>
							<Link to={`${match.url}/assign`}>Assign</Link>
							<Button raised className="d-block" type="submit" color="primary">
								{save.pending
									? <CircularProgress size={15} />
									: id ? "Save" : "Create"}
							</Button>
						</form>
					</RenderContextView>
					<Route
						path={`${match.url}/assign`}
						render={props =>
							<Paper className="col h-100vh" elevation={1}>
								<AppBar position="static">
									<Toolbar>
										<Typography type="title" className="mr-auto">
											Assign
										</Typography>
										<Link to={match.url}>
											<IconButton>
												<Close />
											</IconButton>
										</Link>
									</Toolbar>
								</AppBar>
								<ConnectedUserList {...props} />
							</Paper>}
					/>
				</div>
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
