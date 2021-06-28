import * as React from "react";
import { Currency, ICurrencyAPI } from "~/c/currency";

interface IProps {
	value: string;
}

const baseLink = "https://raw.githubusercontent.com/transferwise/currency-flags/master/src/flags/";

export class CurrencyRow extends React.Component<IProps, ICurrencyAPI | undefined> {
	public state: ICurrencyAPI | undefined = Currency.get(this.props.value);

	public render(): JSX.Element | null {
		if (this.state === undefined) return null;

		const link = `${baseLink}${this.state.cc.toLowerCase()}.png`;

		return (
			<div className="row">
				<img src={link} />
				<h1> {this.state.cc}</h1>
				<h2>{this.state.rate}</h2>
			</div>
		);
	}
}
