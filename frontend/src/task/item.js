import React from "react";
import { Link, Route } from "react-router-dom";
import { AppBar } from "material-ui";
import IconButton from "material-ui/IconButton";
import NavigationClose from "material-ui/svg-icons/navigation/close";

const Item = ({ className }) => {
	return (
		<div className={className}>
			<AppBar
				iconElementLeft={
					<Link to={`/tasks`}>
						<IconButton>
							<NavigationClose />
						</IconButton>
					</Link>
				}
				title="Create"
			/>
		</div>
	);
};

export default Item;
