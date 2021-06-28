import { SpreadSheet } from "../services/googleSpreadsheet";
import { Lang } from "./lang";

export interface IDataSet {
	type: string;
	title: string;
	subTitle: string;
	infoblockHeader: string;
	description: [string, string][];
	propose: (string | object)[];
}

export interface IDescription {
	host: [string, string][];
	rates: [string, string][];
	currency: [string, string][];
	services1: [string, string][];
	services2: [string, string][];
}

export interface IDataCurrency extends IDataSet {
	propose: string[];
}

export interface IDataHost extends IDataSet {
	propose: IHost[];
}

export interface IHost {
	nameUA: string;
	nameEN: string;
	postUA: string;
	postEN: string;
}

export interface IDataRates extends IDataSet {
	propose: IRates[];
}

export interface IRates {
	name: string;
	descUa: string;
	descEn: string;
	proposeValUa: string;
}

export interface IDataServices extends IDataSet {
	propose: IServices[];
}

export interface IServices {
	descUa: string;
	descEn: string;
	value: string;
}

export class Data {
	public static currency: IDataCurrency;
	public static host: IDataHost;
	public static rates: IDataRates;
	public static services1: IDataServices;
	public static services2: IDataServices;
	public static description: IDescription = {
		host: [],
		rates: [],
		currency: [],
		services1: [],
		services2: []
	};

	public static async init(): Promise<void | never> {
		await Data.collectDesc();
		await Data.collectCurrency();
		await Data.collectHost();
		await Data.collectRates();
		await Data.collectServices(1);
		await Data.collectServices(2);
	}

	public static async collectDesc(): Promise<void | never> {
		const rows = await SpreadSheet.getTab("Description");
		if (!rows) return;

		let i = 0;
		for (const row of rows) {
			i += 1;
			if (i < 1) continue;
			if (row[0] === "Подальші рядки не відслідковуються") break;

			const [type, ua, en] = row as string[];
			Data.description[type].push([ua, en]);
		}
	}

	public static async collectCurrency(): Promise<void | never> {
		const rows = await SpreadSheet.getTab("Currency_Informer");
		if (!rows) return;
		const propose: string[] = [];

		for (const row of rows) {
			if (row[0] === "Подальші рядки не відслідковуються") break;
			else propose.push(row[0] as string);
		}

		const data: IDataCurrency = {
			type: "currency",
			title: Lang.text.change.ua,
			subTitle: Lang.text.change.en,
			description: Data.description.currency,
			infoblockHeader: "",
			propose
		};

		Data.currency = data;
	}

	public static async collectHost(): Promise<void | never> {
		const rows = await SpreadSheet.getTab("Host_Informer");
		if (!rows) return;
		const propose: IHost[] = [];

		let i = 0;
		for (const row of rows) {
			i += 1;
			if (i < 2) continue;
			if (row[0] === "Подальші рядки не відслідковуються") break;
			else {
				const [nameUA, nameEN, postUA, postEN] = row as string[];
				propose.push({ nameUA, nameEN, postUA, postEN });
			}
		}

		const data: IDataHost = {
			type: "host",
			title: Lang.text.host.ua,
			subTitle: Lang.text.host.en,
			description: Data.description.host,
			infoblockHeader: "",
			propose
		};

		Data.host = data;
	}

	public static async collectRates(): Promise<void | never> {
		const rows = await SpreadSheet.getTab("Room_Rates_Informer");
		if (!rows) return;
		const propose: IRates[] = [];

		for (const row of rows) {
			if (row[0] === "Подальші рядки не відслідковуються") break;
			else {
				const [name, proposeValUa, descUa, descEn] = row as string[];
				propose.push({ name, proposeValUa, descUa, descEn });
			}
		}

		const data: IDataRates = {
			type: "rates",
			title: `${Lang.text.roomrates.ua} / ${Lang.text.day.ua}`,
			subTitle: `${Lang.text.roomrates.en} / ${Lang.text.day.en}`,
			description: Data.description.rates,
			infoblockHeader: `${Lang.text.ratesperday.ua} / ${Lang.text.ratesperday.en}`,
			propose
		};
		Data.rates = data;
	}

	public static async collectServices(type: 1 | 2): Promise<void | never> {
		const rows = await SpreadSheet.getTab(`Services${type}_Informer`);
		if (!rows) return;
		const propose: IServices[] = [];

		let i = 0;
		for (const row of rows) {
			i += 1;
			if (i < 2) continue;
			if (row[0] === "Подальші рядки не відслідковуються") break;
			else {
				const [descUa, descEn, value] = row as string[];
				propose.push({ descUa, descEn, value });
			}
		}
		const data: IDataServices = {
			type: `services${type}`,
			title: Lang.text.services.ua,
			subTitle: Lang.text.services.en,
			description: Data.description[`services${type}`],
			infoblockHeader: ``,
			propose
		};

		Data[`services${type}`] = data;
	}
}
