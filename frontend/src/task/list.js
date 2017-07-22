import React, { Component } from "react";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";
import Table, {
	TableBody,
	TableCell,
	TableHead,
	TableRow,
} from "material-ui/Table";
import { LinearProgress } from "material-ui/Progress";

@observer
class list extends Component {
	componentDidMount() {
		this.props.load();
	}

	render() {
		const { request, listURL } = this.props;
		return (
			<div>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>ID</TableCell>
							<TableCell>Name</TableCell>
							<TableCell>Notes</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{request &&
							request.case({
								rejected: error => <div>Ooops..</div>,
								pending: () =>
									<TableRow>
										<TableCell colSpan="3">
											<LinearProgress />
										</TableCell>
									</TableRow>,
								fulfilled: result =>
									result.data.content.map(row =>
										<TableRow key={row.id}>
											<TableCell>
												{row.id}
											</TableCell>
											<TableCell>
												<Link to={`${listURL}/${row.id}`}>
													{row.name}
												</Link>
											</TableCell>
											<TableCell>
												{row.notes}
											</TableCell>
										</TableRow>
									),
							})}
					</TableBody>
				</Table>
			</div>
		);
	}
}
export default list;
