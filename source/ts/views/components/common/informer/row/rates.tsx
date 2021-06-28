import * as React from "react";
import { IRates } from "~/c/data";

interface IProps {
	value: IRates;
}

export class RatesRow extends React.Component<IProps> {
	public render(): JSX.Element | null {
		const { name, descUa, descEn, proposeValUa } = this.props.value;

		const ua = name !== " " ? descUa : null;
		const en = name !== " " ? descEn : null;
		const sign = name !== " " ? <span className="sign"> ₴</span> : <div>&#8194;</div>;
		return (
			<div className="row">
				<ul>
					<li>
						<h1>{name}</h1>
					</li>
					<li>
						<h2>
							{ua} <span>{en}</span>
						</h2>
					</li>
				</ul>
				<span>
					{proposeValUa}
					{sign}
				</span>
			</div>
		);
	}
}
