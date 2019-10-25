import React, { Component } from "react";
import { mermaidAPI } from "mermaid";

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
