import React, { Component } from "react";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import IconButton from "material-ui/IconButton";
import MenuIcon from "material-ui-icons/Menu";
import Refresh from "material-ui-icons/Refresh";
import { CircularProgress } from "material-ui/Progress";
import { urlStateHolder } from "common/stateHolder";
import { parseURL } from "common/parseURL";
import { findAll } from "api/task";
import { connect } from "common/connector";
import { List } from "../task/list";

class Me extends Component {
	render() {
		const { findAll, toggleSideBar } = this.props;
		return (
			<div className="w-100">
				<AppBar position="static">
					<Toolbar>
						<IconButton
							onClick={toggleSideBar}
							color="contrast"
							aria-label="Menu"
						>
							<MenuIcon />
						</IconButton>
						<Typography type="title" color="inherit" className="mr-auto">
							Me
						</Typography>
						<IconButton color="contrast" onClick={findAll.refresh}>
							{findAll.pending ? (
								<span>
									<CircularProgress color="inherit" size={14} />
								</span>
							) : (
								<Refresh />
							)}
						</IconButton>
					</Toolbar>
				</AppBar>
				<List findAll={findAll} />
			</div>
		);
	}
}

const ConnectedMe = urlStateHolder(
	connect({
		findAll: {
			params: props => ({
				...parseURL(props),
				userId: props.authenticate.value.data.id,
			}),
			promise: findAll,
		},
	})(Me)
);

export { ConnectedMe as Me };
