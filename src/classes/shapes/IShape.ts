import { ShapePixelPosition, Shape } from "./types";

export class IShape implements Shape {
	name: string = "IShape";

	colour: string = "#51E1FB";

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
				rowIndex: spawnRowIndex + 3,
				columnIndex: spawnColumnIndex,
			},
		];
	}
}
