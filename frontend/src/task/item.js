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

import TaskStore from "store/taskStore";

class Item extends Component {
	constructor(props) {
		super(props);
		this.model = TaskStore.create();
		const id = props.match.params.id;
		if (id !== "create") {
			this.model.id = id;
		}
	}

	componentDidMount() {
		if (this.model.id) {
			this.model.load();
		}
	}

	handleSubmit = evt => {
		evt.preventDefault();
		this.model.save().then(() => {
			const { load, history } = this.props;
			if (load) {
				load();
			}
			history.push("/tasks");
		});
	};

	handleUserInput = evt => {
		this.model[evt.target.name] = evt.target.value;
	};

	render() {
		const { className } = this.props;
		return (
			<Paper className={className} elevation={1}>
				<AppBar position="static">
					<Toolbar>
						<Typography type="title" className="mr-auto">
							Create
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
						value={this.model.name}
						onChange={this.handleUserInput}
						label="Name"
						required
						marginForm
					/>
					<TextField
						name="notes"
						value={this.model.notes}
						onChange={this.handleUserInput}
						label="Notes"
						marginForm
					/>
					<Button raised className="d-block" type="submit" color="primary">
						Create
					</Button>
				</form>
			</Paper>
		);
	}
}

export default Item;
