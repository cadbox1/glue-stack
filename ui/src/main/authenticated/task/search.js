import React, { Component } from "react";
import Paper from "material-ui/Paper";
import { withStyles } from "material-ui/styles";
import Typography from "material-ui/Typography";
import MenuItem from "material-ui/Menu/MenuItem";
import { connect } from "common/connector";
import { stateHolder } from "common/stateHolder";
import { TaskStatus } from "api/task";
import { List, connectConfig } from "../user/list";
import ExpansionPanel, {
	ExpansionPanelSummary,
	ExpansionPanelDetails,
} from "material-ui/ExpansionPanel";
import { styles as expansionPanelStyles } from "material-ui/ExpansionPanel/ExpansionPanel";
import ExpandMoreIcon from "material-ui-icons/ExpandMore";
import Select from "material-ui/Select";

const ConnectedUserList = stateHolder(connect(connectConfig)(List));

class Search extends Component {
	handleSelectUser = user => {
		const { findAll } = this.props;
		const { userId } = findAll.params;
		const newUserId = userId === user.id ? null : user.id;
		findAll.handleUpdate({ userId: newUserId });
	};

	handleStatusChange = evt => {
		const { findAll } = this.props;
		const value = evt.target.value !== "" ? evt.target.value : undefined;
		findAll.handleUpdate({ statusId: value });
	};

	render() {
		const { classes, findAll } = this.props;
		return (
			<div>
				<ExpansionPanel>
					<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
						<Typography>Filter By Users</Typography>
					</ExpansionPanelSummary>
					<ExpansionPanelDetails>
						<ConnectedUserList
							onSelect={this.handleSelectUser}
							selected={[findAll.params.userId]}
						/>
					</ExpansionPanelDetails>
				</ExpansionPanel>

				<Paper
					elevation={1}
					className={classes.root}
					style={{
						display: "flex",
						alignItems: "center",
						padding: "12px 24px",
					}}
				>
					<Typography style={{ width: "33.33%" }}>Status</Typography>
					<Select
						value={
							findAll.params.statusId != null ? findAll.params.statusId : ""
						}
						onChange={this.handleStatusChange}
						displayEmpty
					>
						<MenuItem value="">Any</MenuItem>
						<MenuItem value={TaskStatus.TODO}>Todo</MenuItem>
						<MenuItem value={TaskStatus.DONE}>Done</MenuItem>
					</Select>
				</Paper>
			</div>
		);
	}
}

const StyledSearch = withStyles(expansionPanelStyles)(Search);

export { StyledSearch as Search };
