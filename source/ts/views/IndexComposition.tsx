import * as React from "react";
import { Header } from "./components/header";
import { Main } from "./components/main";

export class IndexComposition extends React.Component {
	public render(): JSX.Element[] {
		return [<Header key="header" />, <Main key="middle" />];
	}
}
