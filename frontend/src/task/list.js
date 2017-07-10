import React, { Component } from "react";
import { autorun } from "mobx";
import { observer } from "mobx-react";
import { fromPromise } from "mobx-utils";
import axios from "axios";

@observer
class list extends Component {
	constructor() {
		super();
		autorun(this.fetch);
	}

	fetch = () => {
		this.request = fromPromise(axios.get("tasks"));
	};

	render() {
		return (
			<div>
				{this.request &&
					this.request.case({
						pending: () => <div>Loading...</div>,
						rejected: error => <div>Ooops..</div>,
						fulfilled: result => <div>LOADED!</div>,
					})}
			</div>
		);
	}
}
export default list;
