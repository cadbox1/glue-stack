import React, { Component } from "react";
import { observer } from "mobx-react";
import Table, {
	TableBody,
	TableCell,
	TableHead,
	TableRow,
} from "material-ui/Table";

@observer
class list extends Component {
	componentDidMount() {
		this.props.load();
	}

	table(result) {
		return (
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>ID</TableCell>
						<TableCell>Name</TableCell>
						<TableCell>Notes</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{result.data.content.map(row =>
						<TableRow key={row.id}>
							<TableCell>
								{row.id}
							</TableCell>
							<TableCell>
								{row.name}
							</TableCell>
							<TableCell>
								{row.notes}
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		);
	}

	render() {
		const { request } = this.props;
		return (
			<div>
				{request &&
					request.case({
						pending: () => <div>Loading...</div>,
						rejected: error => <div>Ooops..</div>,
						fulfilled: result => this.table(result),
					})}
			</div>
		);
	}
}
export default list;
