import React, { Component } from "react";
import Table, {
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	TableFooter,
} from "material-ui/Table";
import { parseURL } from "common/parseURL";
import { TablePagination } from "common/tablePagination";
import { findAll } from "api/task";
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
						<TablePagination findAll={findAll} />
					</TableFooter>
				)}
			</Table>
		);
	}
}

export { List };

export const connectConfig = {
	findAll: {
		params: props => parseURL(props),
		promise: findAll,
	},
};
