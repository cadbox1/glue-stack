import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import { AppBar } from "material-ui";
import IconButton from "material-ui/IconButton";
import NavigationClose from "material-ui/svg-icons/navigation/close";
import TextField from "common/TextField";
import RaisedButton from "material-ui/RaisedButton";
import Paper from "material-ui/Paper";

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
		this.model.save();
	};

	handleUserInput = evt => {
		this.model[evt.currentTarget.name] = evt.currentTarget.value;
	};

	render() {
		const { className } = this.props;
		return (
			<Paper className={className} zDepth={1} rounded={false}>
				<AppBar
					showMenuIconButton={false}
					iconElementRight={
						<Link to={`/tasks`}>
							<IconButton>
								<NavigationClose />
							</IconButton>
						</Link>
					}
					title="Create"
				/>
				<form onSubmit={this.handleSubmit} className="container-fluid">
					<div>
						<TextField
							name="name"
							value={this.model.name}
							onChange={this.handleUserInput}
							floatingLabelText="Name *"
							required
						/>
					</div>
					<div>
						<TextField
							name="notes"
							value={this.model.notes}
							onChange={this.handleUserInput}
							floatingLabelText="Notes *"
							required
						/>
					</div>
					<RaisedButton type="submit" label="Create" primary={true} />
				</form>
			</Paper>
		);
	}
}

export default Item;
