import * as React from "react";
import { render } from "react-dom";

export class ViewController {
	constructor(indexView: React.ComponentClass) {
		const comp = React.createElement(indexView);
		const cont: HTMLElement | null = document.getElementById("container");
		render(comp, cont);
	}
}
