import { SpreadSheet } from "../services/googleSpreadsheet";

interface ITranslate {
	[key: string]: { ua: string; en: string };
}

export class Lang {
	public static text: ITranslate;

	public static async init(): Promise<void | never> {
		const rows = await SpreadSheet.getTab("Translations");
		if (!rows) return;
		const data: ITranslate = {};

		for (const row of rows) {
			const [_FIELD, ua, en] = row as string[];
			if (_FIELD === "Подальші рядки не відслідковуються") break;
			else data[_FIELD] = { ua, en };
		}

		Lang.text = data;
	}
}
