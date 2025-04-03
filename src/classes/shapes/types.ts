export type ShapePixelPosition = { rowIndex: number; columnIndex: number };

export interface Shape {
	colour: string;
	name: string;
	getSpawnCoordinates(
		spawnRowIndex: number,
		spawnColumnIndex: number
	): ShapePixelPosition[];
}
