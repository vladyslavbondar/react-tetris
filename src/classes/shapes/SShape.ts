import { ShapePixelPosition, Shape } from "./types";

export class SShape implements Shape {
	name: string = "SShape";

	colour: string = "#FF0000";

	getSpawnCoordinates(
		spawnRowIndex: number,
		spawnColumnIndex: number
	): ShapePixelPosition[] {
		return [
			{
				rowIndex: spawnRowIndex,
				columnIndex: spawnColumnIndex + 1,
			},
			{
				rowIndex: spawnRowIndex,
				columnIndex: spawnColumnIndex + 2,
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
