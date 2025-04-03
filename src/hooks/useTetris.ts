import { useCallback, useEffect, useState, useRef } from "react";
import { getRandomNumberInRange } from "../utils";
import {
	IShape,
	JShape,
	LShape,
	OShape,
	SShape,
	TShape,
	ZShape,
	ShapePixelPosition,
	Shape,
} from "../classes/shapes";
import { TetrisPixelState } from "../types";
import {
	getEmptyPlayingField,
	deepCopyPlayingField,
	getEmptyPlayingFieldRow,
} from "./utils";
import { TetrisPixel } from "../classes";

// 24 rows because first 4 rows are for shapes spawn
const ROWS_AMOUNT = 24;
const COLUMNS_AMOUNT = 10;

const shapes = [
	new IShape(),
	new JShape(),
	new LShape(),
	new OShape(),
	new SShape(),
	new TShape(),
	new ZShape(),
];

export function useTetris() {
	const [playingField, setPlayingField] = useState<TetrisPixel[][]>(
		getEmptyPlayingField(ROWS_AMOUNT, COLUMNS_AMOUNT)
	);
	const virtualPlayingField = useRef<TetrisPixel[][]>(playingField);
	const activeShape = useRef<Shape | null>(null);
	const activeShapePosition = useRef<ShapePixelPosition[] | null>(null);

	const renderCommit = useCallback(() => {
		setPlayingField(deepCopyPlayingField(virtualPlayingField.current));
	}, []);

	useEffect(() => {
		virtualPlayingField.current = deepCopyPlayingField(playingField);
	}, [playingField]);

	const canRenderAtCoordinates = useCallback(
		(shapeCoordinates: ShapePixelPosition[]): boolean => {
			return shapeCoordinates.every((shapePixel) => {
				return (
					virtualPlayingField.current[shapePixel.rowIndex] &&
					virtualPlayingField.current[shapePixel.rowIndex][
						shapePixel.columnIndex
					] &&
					virtualPlayingField.current[shapePixel.rowIndex][
						shapePixel.columnIndex
					].pixelState !== TetrisPixelState.StaticShape
				);
			});
		},
		[]
	);

	const clearActiveShapeFromField = useCallback(() => {
		virtualPlayingField.current.forEach((playingFieldRow) => {
			playingFieldRow.forEach((playingFieldColumn) => {
				if (playingFieldColumn.pixelState === TetrisPixelState.ActiveShape) {
					playingFieldColumn.colour = null;
					playingFieldColumn.pixelState = TetrisPixelState.EmptyPixel;
				}
			});
		});
	}, []);

	const renderShapeToPlayingField = useCallback(
		(shape: Shape, shapeCoordinates: ShapePixelPosition[]) => {
			clearActiveShapeFromField();
			shapeCoordinates.forEach((shapePixel) => {
				const fieldPixel =
					virtualPlayingField.current[shapePixel.rowIndex][
						shapePixel.columnIndex
					];
				fieldPixel.colour = shape.colour;
				fieldPixel.pixelState = TetrisPixelState.ActiveShape;
			});

			activeShape.current = shape;
			activeShapePosition.current = shapeCoordinates;
		},
		[clearActiveShapeFromField]
	);

	const getRandomShape = useCallback(() => {
		return shapes[getRandomNumberInRange(0, shapes.length - 1)];
	}, []);

	const getNextMoveDownCoordinates = useCallback(() => {
		if (!activeShapePosition.current)
			throw new Error("Active shape does not exist in the field");

		return activeShapePosition.current.map((shapePosition) => ({
			...shapePosition,
			rowIndex: shapePosition.rowIndex + 1,
		}));
	}, []);

	const getNextMoveLeftCoordinates = useCallback(() => {
		if (!activeShapePosition.current)
			throw new Error("Active shape does not exist in the field");

		return activeShapePosition.current.map((shapePosition) => ({
			...shapePosition,
			columnIndex: shapePosition.columnIndex - 1,
		}));
	}, []);

	const getNextMoveRightCoordinates = useCallback(() => {
		if (!activeShapePosition.current)
			throw new Error("Active shape does not exist in the field");

		return activeShapePosition.current.map((shapePosition) => ({
			...shapePosition,
			columnIndex: shapePosition.columnIndex + 1,
		}));
	}, []);

	const deactivateActiveShape = useCallback(() => {
		if (!activeShapePosition.current)
			throw new Error("Active shape does not exist in the field");

		activeShapePosition.current.forEach((shapePostion) => {
			const playingFieldPixel =
				virtualPlayingField.current[shapePostion.rowIndex][
					shapePostion.columnIndex
				];
			playingFieldPixel.pixelState = TetrisPixelState.StaticShape;
		});

		activeShape.current = null;
		activeShapePosition.current = null;
	}, []);

	const clearFilledrows = useCallback(() => {
		virtualPlayingField.current.forEach(
			(playingFieldRow, playingFieldIndex) => {
				const isRowFilled = playingFieldRow.every(
					(playingFieldColumn) =>
						playingFieldColumn.pixelState === TetrisPixelState.StaticShape
				);

				if (isRowFilled) {
					virtualPlayingField.current.splice(playingFieldIndex, 1);
					virtualPlayingField.current.splice(
						0,
						0,
						getEmptyPlayingFieldRow(COLUMNS_AMOUNT)
					);
				}
			}
		);
	}, []);

	const clearActiveShape = useCallback(() => {
		activeShape.current = null;
		activeShapePosition.current = null;
	}, []);

	const reset = useCallback(() => {
		activeShape.current = null;
		activeShapePosition.current = null;
		setPlayingField(getEmptyPlayingField(ROWS_AMOUNT, COLUMNS_AMOUNT));
	}, []);

	return {
		playingField,
		canRenderAtCoordinates,
		renderShapeToPlayingField,
		getRandomShape,
		getNextMoveDownCoordinates,
		getNextMoveLeftCoordinates,
		getNextMoveRightCoordinates,
		activeShape: activeShape.current,
		renderCommit,
		deactivateActiveShape,
		clearFilledrows,
		clearActiveShape,
		reset,
	};
}
