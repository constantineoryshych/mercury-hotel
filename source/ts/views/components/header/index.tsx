import * as React from "react";
import moment from "moment";
import TextIconInfoBlock from "../common/textIconInfoBlock";
import { Greeter } from "../../../controller/timeTriger";
import { Lang } from "../../../controller/lang";
import LogoView from "./logo";

interface IState {
	lang: "en" | "ua";
}

export class Header extends React.Component<{}, IState> {
	public state: IState = {
		lang: "en"
	};

	private isMount: boolean = false;

	public render(): JSX.Element {
		const { lang } = this.state;
		const { welcometo, mercure, congress } = Lang.text;
		const text = `${welcometo[lang]}\r\n ${mercure[lang]} ${congress[lang]}`;
		const colors = this.colorChange();

		return (
			<header>
				<TextIconInfoBlock text={text} icon="vase" color={colors[0]} />
				<LogoView />
				<TextIconInfoBlock date={this.momentWiget()} icon="clock" color={colors[1]}/>
			</header>
		);
	}

	public componentDidMount(): void {
		this.isMount = true;

		Greeter.subscribe(
			(): void => {
				if (!this.isMount) return;
				this.langs();
			}
		);
	}

	public componentWillUnmount(): void {
		this.isMount = false;
	}

	private langs(): void {
		const lang = this.state.lang === "en" ? "ua" : "en";
		this.setState({ lang });
	}

	private colorChange(): ["gold" | "purple", "gold" | "purple"] {
		return this.state.lang === "en" ? ["gold", "purple"] : ["purple", "gold"];
	}

	private momentWiget(): string[] {
		const m = (this.state.lang === "en") ? "uk" : "en";
		const now = moment();
		const { lang } = this.state;
		return [now.locale(m).format("dddd L"), now.format("LT")];
	}
}
