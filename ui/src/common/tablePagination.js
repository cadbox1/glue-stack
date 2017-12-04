import React, { Component } from "react";
import { TablePagination } from "material-ui/Table";

class MyTablePagination extends Component {
	handleChangePage = page => {
		this.props.findAll.handleUpdate({ page });
	};
	handleChangePageSize = evt => {
		this.props.findAll.handleUpdate({ size: evt.target.value });
	};
	render() {
		const { findAll } = this.props;
		return (
			<TablePagination
				count={findAll.value.data.totalElements}
				rowsPerPage={findAll.params.size}
				page={findAll.value.data.number}
				rowsPerPageOptions={[10, 20, 50, 100]}
				onChangePage={this.handleChangePage}
				onChangeRowsPerPage={this.handleChangePageSize}
			/>
		);
	}
}

export { MyTablePagination as TablePagination };
