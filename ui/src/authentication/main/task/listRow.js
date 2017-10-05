import React, { Component } from "react";
import { TableCell, TableRow } from "material-ui/Table";
import { CircularProgress } from "material-ui/Progress";
import IconButton from "material-ui/IconButton";
import Done from "material-ui-icons/Done";
import Undo from "material-ui-icons/Undo";
import { patch } from "api/task";
import { connect } from "api/connector";
import { TaskStatus } from "common/taskStatus";

class ListRow extends Component {
	handleDone = () => {
		const { data, patch, findAll } = this.props;
		patch
			.promise(data.id, { statusId: TaskStatus.DONE })
			.then(() => findAll.promise());
	};

	handleUndo = () => {
		const { data, patch, findAll } = this.props;
		patch
			.promise(data.id, { statusId: TaskStatus.TODO })
			.then(() => findAll.promise());
	};

	render() {
		const { data, patch } = this.props;
		return (
			<TableRow key={data.id}>
				<TableCell>{data.name}</TableCell>
				<TableCell>{data.notes}</TableCell>
				<TableCell>
					{data.statusId === TaskStatus.TODO ? "To Do" : "Done"}
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
							<CircularProgress size={15} />
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
