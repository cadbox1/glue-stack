import React, { Component } from "react";
import Table, {
	TableBody,
	TableHead,
	TableRow,
	TableFooter,
} from "material-ui/Table";
import Hidden from "material-ui/Hidden";
import { TableCell } from "common/tableCell";
import { parseURL } from "common/parseURL";
import { TablePagination } from "common/tablePagination";
import { TableSortLabel } from "common/tableSortLabel";
import { findAll } from "api/task";
import { ListRow } from "./listRow";

class List extends Component {
	render() {
		const { findAll, listURL } = this.props;
		return (
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>
							<TableSortLabel findAll={findAll} property="name">
								Name
							</TableSortLabel>
						</TableCell>
						<Hidden smDown>
							<TableCell>
								<TableSortLabel findAll={findAll} property="notes">
									Notes
								</TableSortLabel>
							</TableCell>
						</Hidden>
						<TableCell>
							<TableSortLabel findAll={findAll} property="statusId">
								Status
							</TableSortLabel>
						</TableCell>
						<TableCell>
							<TableSortLabel findAll={findAll} property="user.firstName">
								Assigned
							</TableSortLabel>
						</TableCell>
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
						<TableRow>
							<TablePagination findAll={findAll} />
						</TableRow>
					</TableFooter>
				)}
			</Table>
		);
	}
}

export { List };

export const connectConfig = {
	findAll: {
		params: props => {
			const { statusId, userId } = props.params;
			return {
				...parseURL(props),
				statusId: statusId != null ? Number(statusId) : statusId,
				userId: userId != null ? Number(userId) : userId,
			};
		},
		promise: findAll,
	},
};
