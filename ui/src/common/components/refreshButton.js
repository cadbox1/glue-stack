import React, { Component } from "react";
import IconButton from "@material-ui/core/IconButton";
import Refresh from "@material-ui/icons/Refresh";
import CircularProgress from "@material-ui/core/CircularProgress";

class RefreshButton extends Component {
	render() {
		const { findAll } = this.props;
		return (
			<IconButton color="inherit" onClick={findAll.refresh}>
				{findAll.pending ? (
					<span>
						<CircularProgress color="inherit" size={20} />
					</span>
				) : (
					<Refresh />
				)}
			</IconButton>
		);
	}
}

export { RefreshButton };
