import request from "browser-request";
import _DEFAULT_CONFIG, { IConfig } from "~/data/config.default";
import { SpreadSheet } from "../services/googleSpreadsheet";

const config = _DEFAULT_CONFIG;

export default config;

export class Config {
	public static config: IConfig;

	public static spreadsheet: string;

	public static async getArgs(): Promise<{}> {
		return new Promise(
			(resolve => resolve(
				request(
					{ method: "GET", url: "/args", json: true },
					(er: Error, response: { statusCode: number }, body: { data: { [key: string]: string } }) => {
						if (response.statusCode === 200) {
							try {
								this.spreadsheet = body.data.spreadsheet;
							} catch (e) {
								global.console.warn(e);
							}
						}
						resolve("");
					}
				)
			)
		)
		)
	}

	public static async init(): Promise<void | never> {
		await this.getArgs();
		const rows = await SpreadSheet.getTab("Config");
		if (!rows) return;
		const data: IConfig = { delay: 7000, rotation: [], spreadsheet: this.spreadsheet || _DEFAULT_CONFIG.spreadsheet };

		for (const row of rows) {
			if (row[0] === "Подальші рядки не відслідковуються") break;
			else {
				if (row[0] === "delay-informer") data.delay = Number(row[1]);
				else if (row[0] === "informer-slide") {
					const slide: string[] = [];
					for (let i = 1; i < 4; i++) {
						if (typeof row[i] === "string" && row[i].length > 0) slide.push(row[i]);
					}
					if (slide.length > 0) data.rotation.push(slide);
				}
			}
		}

		if (data.rotation.length < 1) data.rotation = _DEFAULT_CONFIG.rotation;

		config.rotation = data.rotation.length > 0 ? data.rotation : _DEFAULT_CONFIG.rotation;
		config.delay = typeof data.delay === "number" && data.delay > 500 ? data.delay : _DEFAULT_CONFIG.delay;
	}
}
