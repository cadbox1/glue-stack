import React, { Component } from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import CircularProgress from "@material-ui/core/CircularProgress";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";
import Done from "@material-ui/icons/Done";
import Undo from "@material-ui/icons/Undo";
import { Link } from "common/components/Link";
import { connect } from "common/connector";
import { patch, TaskStatus } from "api/task";

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
					{data.statusId === TaskStatus.TODO ? "Todo" : "Done"}
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
								<CircularProgress size={20} />
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
