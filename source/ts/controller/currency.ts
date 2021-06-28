import find from "lodash/find";

export interface ICurrencyAPI {
	r030: number;
	txt: string;
	rate: number;
	cc: string;
	exhangedate: string;
}

export class Currency {
	private static currency: ICurrencyAPI[];

	public static get(code: string): ICurrencyAPI | undefined {
		return find(Currency.currency, { cc: code });
	}

	public static async init(): Promise<void | never> {
		try {
			const res = await fetch("https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json");
			Currency.currency = await res.json() as ICurrencyAPI[];
		} catch (err) {
			throw err;
		}
	}
}
