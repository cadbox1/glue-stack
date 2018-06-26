import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Refresh from "@material-ui/icons/Refresh";
import CircularProgress from "@material-ui/core/CircularProgress";
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
							color="inherit"
							aria-label="Menu"
						>
							<MenuIcon />
						</IconButton>
						<Typography type="title" color="inherit" className="mr-auto">
							Me
						</Typography>
						<IconButton color="inherit" onClick={findAll.refresh}>
							{findAll.pending ? (
								<span>
									<CircularProgress color="inherit" size={20} />
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
