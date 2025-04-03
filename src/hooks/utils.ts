import { TetrisPixel } from "../classes";

export function getEmptyPlayingFieldRow(columns: number) {
	return new Array(columns).fill(null).map(() => new TetrisPixel());
}

export function getEmptyPlayingField(
	rows: number,
	columns: number
): TetrisPixel[][] {
	const tetrisPlayingField = new Array(rows)
		.fill(null)
		.map(() => new Array(columns).fill(null));

	for (let i = 0; i < tetrisPlayingField.length; i++) {
		for (let j = 0; j < tetrisPlayingField[i].length; j++) {
			tetrisPlayingField[i][j] = new TetrisPixel();
		}
	}

	return tetrisPlayingField;
}

export function deepCopyPlayingField(playingField: TetrisPixel[][]) {
	return playingField.map((row) =>
		row.map((pixel) => ({
			...pixel,
		}))
	);
}
