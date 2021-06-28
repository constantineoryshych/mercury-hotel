import _Config from "./config";

type Listener = () => void;

export class Greeter {
	public static greeting: string;
	private static listeners: Listener[] = [];
	private static timer: any;
	private static update: number;

	public static timeUpdate(): void {
		this.timer = setTimeout(this.tick.bind(this), 5000);
	}

	public static subscribe(listener: Listener): void {
		this.listeners.push(listener);
	}

	private static stateDidUpdate(): void {
		for (const listener of this.listeners) {
			listener();
		}
	}

	private static tick(): void {
		this.stateDidUpdate();
		this.timeUpdate();
	}

}
