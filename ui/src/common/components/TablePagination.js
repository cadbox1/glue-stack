import React, { Component } from "react";
import MaterialTablePagination from "@material-ui/core/TablePagination";

class TablePagination extends Component {
	handleChangePage = page => {
		this.props.findAll.handleUpdate({ page });
	};
	handleChangePageSize = evt => {
		this.props.findAll.handleUpdate({ size: evt.target.value });
	};
	render() {
		const { findAll } = this.props;
		return (
			<MaterialTablePagination
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

export { TablePagination };
