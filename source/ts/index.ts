import { SpreadSheet } from "./services/googleSpreadsheet";
import { Config } from "./controller/config";
import { Lang } from "./controller/lang";
import { Data } from "./controller/data";
import { Greeter } from "./controller/timeTriger";
import { Currency } from "./controller/currency";

import { ViewController } from "./views/viewController";
import { IndexComposition } from "./views/indexComposition";

import "./../style/stylesheets/main.sass";

class Main {
	public static async init(): Promise<void> {
		await SpreadSheet.init();
		await Config.init();
		await Lang.init();
		await Data.init();
		await Currency.init();
		Greeter.timeUpdate();
		new ViewController(IndexComposition);
	}
}

Main.init();
