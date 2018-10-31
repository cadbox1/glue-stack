import React, { Component } from "react";
import { Connect } from "common/components/Connect";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableFooter from "@material-ui/core/TableFooter";
import Hidden from "@material-ui/core/Hidden";
import Checkbox from "@material-ui/core/Checkbox";
import { TableCell } from "common/components/TableCell";
import { parsePaginationParameters } from "common/parsePaginationParameters";
import { TablePagination } from "common/components/TablePagination";
import { TableSortLabel } from "common/components/TableSortLabel";
import { findAll } from "api/task";
import { ListRow } from "./listRow";

class List extends Component {
	handleSelectAllClick = event => {
		let selectedIds = [];
		if (event.target.checked) {
			selectedIds = this.props.findAll.value.data.content.map(n => n.id);
		}
		this.props.onSelectIds(selectedIds);
	};

	handleSelect = id => {
		const { selectedIds } = this.props;
		const selectedIndex = selectedIds.indexOf(id);
		let newSelected = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selectedIds, id);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selectedIds.slice(1));
		} else if (selectedIndex === selectedIds.length - 1) {
			newSelected = newSelected.concat(selectedIds.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(
				selectedIds.slice(0, selectedIndex),
				selectedIds.slice(selectedIndex + 1)
			);
		}
		this.props.onSelectIds(newSelected);
	};

	render() {
		const { findAll, listURL, selectedIds } = this.props;

		const numSelected = selectedIds.length;
		const rowCount = findAll.fulfilled ? findAll.value.data.content.length : 1;

		return (
			<div style={{ width: "100%", overflow: "auto" }}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell padding="checkbox">
								<Checkbox
									indeterminate={numSelected > 0 && numSelected < rowCount}
									checked={numSelected === rowCount}
									onChange={this.handleSelectAllClick}
								/>
							</TableCell>
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
									isSelected={selectedIds.includes(row.id)}
									onSelect={this.handleSelect}
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
			</div>
		);
	}
}

export { List };

export const ListConnect = ({ handleUpdate, params, children }) => {
	const { search, statusId, userId } = params;
	return (
		<Connect
			findAll={{
				handleUpdate,
				params: {
					...parsePaginationParameters(params),
					name: search,
					statusId: statusId != null ? Number(statusId) : statusId,
					userId: userId != null ? Number(userId) : userId,
				},
				promise: findAll,
			}}
		>
			{({ findAll }) => children({ findAll })}
		</Connect>
	);
};
