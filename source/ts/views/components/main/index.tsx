import * as React from "react";
import _Config from "~/c/config";
import { Data } from "~/c/data";
import { Greeter } from "~/c/timeTriger";
import { Informer } from "../common/informer";

interface IState {
	slidePosition: 0;
	nameElem: "fadein";
}

export class Main extends React.Component {
	public state: IState = {
		slidePosition: 0,
		nameElem: "fadein"
	};

	private isMount: boolean = false;

	public render(): JSX.Element {
		return (
			<div>
				<main className="fadein">{this.rotation(1)}</main>
			</div>
		);
	}

	public componentDidMount(): void {
		this.isMount = true;

		Greeter.subscribe(
			(): void => {
				if (!this.isMount) return;
				this.nextSlide();
			}
		);
	}

	public componentWillUnmount(): void {
		this.isMount = false;
	}

	private nextSlide(): void {
		let l = this.state.slidePosition;
		if (l <= 1) l++;
		else l = 0;
		this.setState({ slidePosition: l });
	}

	private rotation(num): JSX.Element[] {
		const l = (num < 1) ? num : 0;
		return _Config.rotation[this.state.slidePosition + l].map(this.getInformer.bind(this));
	}

	private getInformer(type: string): JSX.Element {
		return <Informer  key={type} data={Data[type]} />;
	}
}
