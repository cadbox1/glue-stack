import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table, {
	TableBody,
	TableHead,
	TableRow,
	TableFooter,
} from "material-ui/Table";
import { TableCell } from "common/components/tableCell";
import Radio from "material-ui/Radio";
import { parseURL } from "common/parseURL";
import { TableSortLabel } from "common/components/tableSortLabel";
import { TablePagination } from "common/components/tablePagination";
import { findAll } from "api/user";

export class List extends Component {
	render() {
		const { findAll, listURL, onSelect, selected } = this.props;
		return (
			<Table>
				<TableHead>
					<TableRow>
						{onSelect && <TableCell padding="checkbox" />}
						<TableCell>
							<TableSortLabel findAll={findAll} property="firstName">
								Name
							</TableSortLabel>
						</TableCell>
						<TableCell>
							<TableSortLabel findAll={findAll} property="email">
								Email
							</TableSortLabel>
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{findAll.rejected && (
						<TableRow>
							<TableCell colSpan={2}>
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
						findAll.value.data.content.map(row => {
							const name = `${row.firstName} ${row.lastName}`;
							return (
								<TableRow
									key={row.id}
									onClick={onSelect && onSelect.bind(null, row)}
									hover={onSelect}
									style={{ cursor: onSelect ? "pointer" : "default" }}
									selected={selected && selected.includes(row.id)}
								>
									{onSelect && (
										<TableCell padding="checkbox">
											<Radio checked={selected && selected.includes(row.id)} />
										</TableCell>
									)}
									<TableCell>
										{listURL ? (
											<Link to={`${listURL}/${row.id}`}>{name}</Link>
										) : (
											name
										)}
									</TableCell>
									<TableCell>{row.email}</TableCell>
								</TableRow>
							);
						})}
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

export const connectConfig = {
	findAll: {
		params: props => parseURL(props),
		promise: findAll,
	},
};
