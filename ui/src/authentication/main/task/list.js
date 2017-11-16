import React, { Component } from "react";
import Table, {
	TableBody,
	TableCell,
	TableHead,
	TableRow,
} from "material-ui/Table";
import { LinearProgress } from "material-ui/Progress";
import { findAll } from "api/task";
import { connect } from "api/connector";
import { ListRow } from "./listRow";

class List extends Component {
	render() {
		const { findAll, listURL } = this.props;
		return (
			<div>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Name</TableCell>
							<TableCell>Notes</TableCell>
							<TableCell>Status</TableCell>
							<TableCell>Assigned</TableCell>
							<TableCell>Actions</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{findAll.pending && (
							<TableRow>
								<TableCell colSpan="3">
									<LinearProgress />
								</TableCell>
							</TableRow>
						)}
						{findAll.rejected && (
							<TableRow>
								<TableCell colSpan="3">
									{findAll.reason ? (
										<div>
											<p>{findAll.reason.error}</p>
											<p>{findAll.reason.exception}</p>
											<p>{findAll.reason.message}</p>
										</div>
									) : (
										<p>Error</p>
									)}
								</TableCell>
							</TableRow>
						)}
						{findAll.value &&
							findAll.value.data.content.map(row => (
								<ListRow
									key={row.id}
									data={row}
									findAll={findAll}
									listURL={listURL}
								/>
							))}
					</TableBody>
				</Table>
			</div>
		);
	}
}

export const ConnectedTaskList = connect({
	findAll: {
		params: props => ({}),
		promise: findAll,
	},
})(List);

export default List;
