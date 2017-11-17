import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table, {
	TableBody,
	TableCell,
	TableHead,
	TableRow,
} from "material-ui/Table";
import IconButton from "material-ui/IconButton";
import Add from "material-ui-icons/Add";
import { LinearProgress } from "material-ui/Progress";
import { findAll } from "api/user";
import { connect } from "api/connector";

class List extends Component {
	render() {
		const { findAll, listURL, onSelect } = this.props;
		return (
			<div>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Name</TableCell>
							<TableCell>Email</TableCell>
							{onSelect && <TableCell>Select</TableCell>}
						</TableRow>
					</TableHead>
					<TableBody>
						{findAll.pending && (
							<TableRow>
								<TableCell colSpan={onSelect ? 3 : 2}>
									<LinearProgress />
								</TableCell>
							</TableRow>
						)}
						{findAll.rejected && (
							<TableRow>
								<TableCell colSpan={onSelect ? 3 : 2}>
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
								<TableRow key={row.id}>
									<TableCell>
										<Link to={`${listURL}/${row.id}`}>
											{row.firstName} {row.lastName}
										</Link>
									</TableCell>
									<TableCell>{row.email}</TableCell>
									{onSelect && (
										<TableCell>
											<IconButton onClick={onSelect.bind(null, row)}>
												<Add />
											</IconButton>
										</TableCell>
									)}
								</TableRow>
							))}
					</TableBody>
				</Table>
			</div>
		);
	}
}

export const ConnectedUserList = connect({
	findAll: {
		params: props => ({}),
		promise: findAll,
	},
})(List);

export default List;
