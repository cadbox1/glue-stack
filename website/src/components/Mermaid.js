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
		mermaidAPI.render(this.props.name, this.props.children.toString(), html =>
			this.setState({ mermaidHtml: html })
		);
	}

	render() {
		const { mermaidHtml } = this.state;
		return (
			<div
				className="mermaid"
				dangerouslySetInnerHTML={{ __html: mermaidHtml }}
			></div>
		);
	}
}
