import { ShapePixelPosition, Shape } from "./types";

export class TShape implements Shape {
	name: string = "TShape";

	colour: string = "#943692";

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
				rowIndex: spawnRowIndex,
				columnIndex: spawnColumnIndex + 2,
			},
			{
				rowIndex: spawnRowIndex + 1,
				columnIndex: spawnColumnIndex + 1,
			},
		];
	}
}
