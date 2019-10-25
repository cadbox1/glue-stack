import React, { Component } from "react";

let mermaidAPI;
if (typeof window !== `undefined`) {
	mermaidAPI = require("mermaid").mermaidAPI;
}

export class Mermaid extends Component {
	constructor(props) {
		super(props);
		this.state = {
			mermaidHtml: "",
		};
	}

	componentDidMount() {
		const { name = "mermaid-diagram", children } = this.props;
		mermaidAPI.render(name, children, html => {
			this.setState({ mermaidHtml: html })
		});
	}

	render() {
		const { mermaidHtml } = this.state;
		return (
			<div
				style={{overflow: "auto"}}
				dangerouslySetInnerHTML={{ __html: mermaidHtml }}
			></div>
		);
	}
}
