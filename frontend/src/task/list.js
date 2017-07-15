import React, { Component } from "react";
import { autorun } from "mobx";
import { observer } from "mobx-react";
import { fromPromise } from "mobx-utils";
import axios from "axios";
import {
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
} from "material-ui/Table";

@observer
class list extends Component {
	componentDidMount() {
		this.props.load();
	}

	table(result) {
		return (
			<Table>
				<TableHeader>
					<TableRow>
						<TableHeaderColumn>ID</TableHeaderColumn>
						<TableHeaderColumn>Name</TableHeaderColumn>
						<TableHeaderColumn>Notes</TableHeaderColumn>
					</TableRow>
				</TableHeader>
				<TableBody>
					{result.data.content.map(row =>
						<TableRow key={row.id}>
							<TableRowColumn>
								{row.id}
							</TableRowColumn>
							<TableRowColumn>
								{row.name}
							</TableRowColumn>
							<TableRowColumn>
								{row.notes}
							</TableRowColumn>
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
