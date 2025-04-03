import { ShapePixelPosition, Shape } from "./types";

export class JShape implements Shape {
	name: string = "JShape";

	colour: string = "#FEC0CA";

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
				rowIndex: spawnRowIndex + 1,
				columnIndex: spawnColumnIndex + 1,
			},
			{
				rowIndex: spawnRowIndex + 2,
				columnIndex: spawnColumnIndex + 1,
			},
			{
				rowIndex: spawnRowIndex + 2,
				columnIndex: spawnColumnIndex,
			},
		];
	}
}
