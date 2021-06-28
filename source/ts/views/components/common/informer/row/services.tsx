import * as React from "react";
import { IServices } from "../../../../../controller/data";

interface IProps {
	value: IServices;
	type: string;
}

export class Services extends React.Component<IProps> {
	public render(): JSX.Element | null {
		const { descUa, descEn, value } = this.props.value;

		const sign = this.props.type === "services1" ? <span className="sign"> ₴</span> : null;
		const dobleSting = descUa.length > 26 ? "dobleSting" : null;
		return (
			<div className="row">
				<ul>
					<li className={dobleSting + ""}>
						<h1>{descUa ? descUa : null}</h1>
					</li>
					<li>
						<h2><span>{descEn ? descEn : null}</span></h2>
					</li>
				</ul>
				<span>
					{value}
					{sign}
				</span>
			</div>
		);
	}
}
