import React, { Component } from "react";

interface IProps {
	color: "purple" | "gold";
	text?: string;
	icon: string;
	date?: object;
}

export default class TextIconInfoBlock extends Component<IProps, {}> {
	public render(): JSX.Element {
		return (
			<div className={`text-icon-block  ${this.props.color}`}>
				<div className="lines">
					<hr />
					<img src={`./build/style/img/icon/${this.props.icon}.png`} />
					<hr />
				</div>
					{this.parseText()}
					<h1>{(this.props.date) ? this.props.date[0] : null}</h1>
					<h1>{(this.props.date) ? this.props.date[1] : null}</h1>
				<hr />
			</div>
		);
	}

	private parseText(): JSX.Element[] | null {
		if (!this.props.text) return null;
		return this.props.text
			.split(/\\r\\n/g)
			.map((i: string, key: number): JSX.Element => <h1 key={key}>{i}</h1>);
	}
}
