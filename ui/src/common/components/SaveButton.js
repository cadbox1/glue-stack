import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

class SaveButton extends Component {
	render() {
		const { children, save } = this.props;
		return (
			<Button variant="contained" type="submit" color="primary">
				{save.pending ? (
					<CircularProgress size={15} color="inherit" />
				) : (
					children
				)}
			</Button>
		);
	}
}

export { SaveButton };
