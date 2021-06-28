import * as React from "react";
import map from "lodash/map";
import { IDataSet } from "~/c/data";
import { CurrencyRow } from "./row/currency";
import { HostRow } from "./row/host";
import { RatesRow } from "./row/rates";
import { Services } from "./row/services";

//import _Config from "~/c/config";

const createElement = React.createElement;
interface IProps {
	data: IDataSet;
	
}

const row = {
	currency: CurrencyRow,
	host: HostRow,
	rates: RatesRow,
	services1: Services,
	services2: Services
};

interface IState {
	animattion: string
}

export class Informer extends React.Component<IProps> {
	public state: IState = {
		animattion: "fadein"
	};


	public render(): JSX.Element {
		return (
			<div className={"informer"} data-type={this.props.data.type}>
				{this.getHeader()}
				<div className="datablock">
					{this.getColumnNames()}
					{this.getRows()}
				</div>
				{this.getFooter()}
			</div>
		);
	}

	private getHeader(): JSX.Element {
		return (
			<div className="header">
				<h1>{this.props.data.title}</h1>
				<h2>{this.props.data.subTitle}</h2>
			</div>
		);
	}

	private getColumnNames(): JSX.Element {
		return <h1>{this.props.data.infoblockHeader}</h1>;
	}

	private getRows(): JSX.Element | null | any {
		return (
			<div className={this.props.data.type + (" " + this.state.animattion)}>
				{this.props.data.propose.map(
					(value: (string | object)[], index: number): JSX.Element =>
						createElement(row[this.props.data.type], { value, key: `row-${index}`, type: this.props.data.type })
				)}
			</div>
		);
	}

	private getFooter(): JSX.Element {
		return (
			<div className="description">
				{map(
					this.props.data.description,
					(desc: [string, string], key: number): JSX.Element => {
						const [ua, en] = desc;
						return (
							<p key={key}>
								{ua + " "} <span>{en + " "}</span>
							</p>
						);
					}
				)}
			</div>
		);
	}
}
