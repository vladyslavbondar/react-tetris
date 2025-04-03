import { ShapePixelPosition, Shape } from "./types";

export class ZShape implements Shape {
	name: string = "ZShape";

	colour: string = "#048001";

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
				columnIndex: spawnColumnIndex + 1,
			},
			{
				rowIndex: spawnRowIndex + 1,
				columnIndex: spawnColumnIndex + 2,
			},
		];
	}
}
