import { v4 as uuid } from "uuid";
import { TetrisPixelState } from "../types";

export class TetrisPixel {
	public id = uuid();
	pixelState = TetrisPixelState.EmptyPixel;
	colour: string | null = null;
}
