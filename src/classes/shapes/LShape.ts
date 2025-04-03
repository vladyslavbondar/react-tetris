import { ShapePixelPosition, Shape } from "./types";

export class LShape implements Shape {
	name: string = "LShape";

	colour: string = "#F5922F";

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
				rowIndex: spawnRowIndex + 1,
				columnIndex: spawnColumnIndex,
			},
			{
				rowIndex: spawnRowIndex + 2,
				columnIndex: spawnColumnIndex,
			},
			{
				rowIndex: spawnRowIndex + 2,
				columnIndex: spawnColumnIndex + 1,
			},
		];
	}
}
