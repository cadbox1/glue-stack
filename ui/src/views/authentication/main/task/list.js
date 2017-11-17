import React, { Component } from "react";
import Table, {
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	TableFooter,
	TablePagination,
} from "material-ui/Table";
import { findAll } from "api/task";
import { connect } from "api/connector";
import { ListRow } from "./listRow";

class List extends Component {
	render() {
		const { findAll, listURL } = this.props;
		return (
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
				{findAll.fulfilled && (
					<TableFooter>
						<TablePagination
							count={findAll.value.data.totalElements}
							rowsPerPage={findAll.value.data.size}
							page={findAll.value.data.number}
							rowsPerPageOptions={[10, 20, 50, 100]}
							onChangePage={this.handleChangePage}
							onChangeRowsPerPage={this.handleChangeRowsPerPage}
						/>
					</TableFooter>
				)}
			</Table>
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
