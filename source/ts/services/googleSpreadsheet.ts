import sheetsy from "sheetsy";
import find from "lodash/find";
import _CONFIG from "~/c/config";

interface ISpreadsheet {
	name: string;
	authors: {
		name: string;
		email: string;
	}[];
	updated: string;
	sheets: ISheetInfo[];
}

interface ISheetInfo {
	name: string;
	id: string;
	updated: string;
}

interface ISheet {
	name: string;
	updated: string;
	authors: {
		name: string;
		email: string;
	}[];
	rows: object[];
}

export class SpreadSheet {
	private static doc: ISpreadsheet;
	private static updated: string;
	private static sheets: ISheetInfo[];

	public static getUpdated(): string | undefined {
		return this.updated;
	}

	public static async getTab(name: string): Promise<object[] | undefined> {
		const sheet: ISheetInfo | undefined = find(SpreadSheet.sheets, { name });
		if (!sheet) return;
		const tab: ISheet = await sheetsy.getSheet(_CONFIG.spreadsheet, sheet.id);
		return tab.rows;
	}

	public static async init(): Promise<void | never> {
		this.doc = await sheetsy.getWorkbook(_CONFIG.spreadsheet);
		this.updated = this.doc.updated;
		this.sheets = this.doc.sheets;
	}
}
