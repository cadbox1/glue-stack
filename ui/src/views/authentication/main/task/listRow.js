import React, { Component } from "react";
import { Link } from "react-router-dom";
import { TableCell, TableRow } from "material-ui/Table";
import { CircularProgress } from "material-ui/Progress";
import IconButton from "material-ui/IconButton";
import Done from "material-ui-icons/Done";
import Undo from "material-ui-icons/Undo";
import Hidden from "material-ui/Hidden";
import { patch } from "api/task";
import { connect } from "api/connector";
import { TaskStatus } from "common/taskStatus";

class ListRow extends Component {
	handleDone = () => {
		const { data, patch, findAll } = this.props;
		patch
			.call(data.id, { statusId: TaskStatus.DONE })
			.then(() => findAll.call());
	};

	handleUndo = () => {
		const { data, patch, findAll } = this.props;
		patch
			.call(data.id, { statusId: TaskStatus.TODO })
			.then(() => findAll.call());
	};

	render() {
		const { data, listURL, patch } = this.props;
		return (
			<TableRow key={data.id}>
				<TableCell>
					{listURL ? (
						<Link to={`${listURL}/${data.id}`}>{data.name}</Link>
					) : (
						data.name
					)}
				</TableCell>
				<Hidden smDown>
					<TableCell>{data.notes}</TableCell>
				</Hidden>
				<TableCell>
					{data.statusId === TaskStatus.TODO ? "To Do" : "Done"}
				</TableCell>
				<TableCell>
					{data.user ? `${data.user.firstName} ${data.user.lastName}` : ""}
				</TableCell>
				<TableCell>
					<IconButton
						onClick={
							data.statusId === TaskStatus.TODO
								? this.handleDone
								: this.handleUndo
						}
						disabled={patch.pending}
					>
						{patch.pending ? (
							<span>
								<CircularProgress size={15} />
							</span>
						) : data.statusId === TaskStatus.TODO ? (
							<Done />
						) : (
							<Undo />
						)}
					</IconButton>
				</TableCell>
			</TableRow>
		);
	}
}

export default ListRow;

const ConnectedListRow = connect({
	patch: {
		promise: patch,
	},
})(ListRow);

export { ConnectedListRow as ListRow };
