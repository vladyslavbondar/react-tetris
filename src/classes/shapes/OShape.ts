import { ShapePixelPosition, Shape } from "./types";

export class OShape implements Shape {
	name: string = "OShape";

	colour: string = "#FFFD01";

	getSpawnCoordinates(
		spawnRowIndex: number,
		spawnColumnIndex: number
	): ShapePixelPosition[] {
		return [
			{
				rowIndex: spawnRowIndex,
				columnIndex: spawnColumnIndex,
			},
			{
				rowIndex: spawnRowIndex,
				columnIndex: spawnColumnIndex + 1,
			},
			{
				rowIndex: spawnRowIndex + 1,
				columnIndex: spawnColumnIndex,
			},
			{
				rowIndex: spawnRowIndex + 1,
				columnIndex: spawnColumnIndex + 1,
			},
		];
	}
}
