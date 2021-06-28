export interface IConfig {
	spreadsheet: string;
	delay: number;
	rotation: string[][];
}

export default {
	spreadsheet: "1asjOQf9KtejE0M_JaR1gwq5MdAT4Dr7QVvaK1EvTov0",
	delay: 7000,
	rotation: [["rates", "currency", "host"], ["rates", "services1"], ["services1", "services2"]]
} as IConfig;
