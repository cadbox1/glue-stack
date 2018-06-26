import React, { Component } from "react";
import TableSortLabel from "@material-ui/core/TableSortLabel";

class MyTableSortLabel extends Component {
	split = findAll => {
		if (!findAll || !findAll.params || !findAll.params.sort) {
			return {};
		}
		const sortSplit = findAll.params.sort.split(",");
		return { property: sortSplit[0], direction: sortSplit[1] || "asc" };
	};

	handleSort = property => {
		const { findAll } = this.props;
		const currentSort = this.split(findAll);
		let newDirection = "asc";
		if (currentSort.property) {
			if (
				property === currentSort.property &&
				currentSort.direction === "asc"
			) {
				newDirection = "desc";
			}
		}
		findAll.handleUpdate({ sort: `${property},${newDirection}` });
	};

	render() {
		const { findAll, property, children } = this.props;
		const sort = this.split(findAll);
		return (
			<TableSortLabel
				active={property === sort.property}
				direction={sort.direction}
				onClick={() => this.handleSort(property)}
			>
				{children}
			</TableSortLabel>
		);
	}
}

export { MyTableSortLabel as TableSortLabel };
