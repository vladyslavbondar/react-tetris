import { useEffect, useState, useRef, useCallback } from "react";

import { useTetris } from "./useTetris";
import {
	IShape,
	JShape,
	LShape,
	OShape,
	SShape,
	TShape,
	ZShape,
} from "../classes/shapes";

const GAME_SPEED = 1000;
const SPAWN_SHAPE_COLUMN_INDEX = 0;

const spawnRowByShapeMap = {
	[IShape.name]: 0,
	[JShape.name]: 1,
	[LShape.name]: 1,
	[OShape.name]: 2,
	[SShape.name]: 2,
	[TShape.name]: 2,
	[ZShape.name]: 2,
};

export function useTetrisGame() {
	const [gameOver, setGameOver] = useState<boolean>(false);
	const [gameInProgress, setGamesInProgress] = useState<boolean>(false);
	const gameTimeOutId = useRef<number>(NaN);
	const movedToSideTime = useRef<number>(NaN);

	const {
		playingField,
		canRenderAtCoordinates,
		renderShapeToPlayingField,
		getRandomShape,
		getNextMoveDownCoordinates,
		getNextMoveLeftCoordinates,
		getNextMoveRightCoordinates,
		activeShape,
		renderCommit,
		deactivateActiveShape,
		clearFilledrows,
		clearActiveShape,
		reset,
	} = useTetris();

	const moveLeft = useCallback(() => {
		if (!activeShape) return;

		const movedLeftCoordinates = getNextMoveLeftCoordinates();

		if (canRenderAtCoordinates(movedLeftCoordinates)) {
			renderShapeToPlayingField(activeShape, movedLeftCoordinates);
			renderCommit();

			if (isNaN(movedToSideTime.current)) {
				movedToSideTime.current = new Date().getTime();
			}
		}
	}, [
		activeShape,
		renderCommit,
		canRenderAtCoordinates,
		getNextMoveLeftCoordinates,
		renderShapeToPlayingField,
	]);

	const moveRight = useCallback(() => {
		if (!activeShape) return;

		const movedLeftCoordinates = getNextMoveRightCoordinates();

		if (canRenderAtCoordinates(movedLeftCoordinates)) {
			renderShapeToPlayingField(activeShape, movedLeftCoordinates);
			renderCommit();

			if (isNaN(movedToSideTime.current)) {
				movedToSideTime.current = new Date().getTime();
			}
		}
	}, [
		activeShape,
		renderCommit,
		canRenderAtCoordinates,
		getNextMoveRightCoordinates,
		renderShapeToPlayingField,
	]);

	const moveDown = useCallback(() => {
		if (!activeShape) return;

		const nextMoveDownCoordinates = getNextMoveDownCoordinates();

		if (canRenderAtCoordinates(nextMoveDownCoordinates)) {
			renderShapeToPlayingField(activeShape, nextMoveDownCoordinates);
		} else {
			deactivateActiveShape();
			clearFilledrows();
		}

		renderCommit();
	}, [
		activeShape,
		renderCommit,
		canRenderAtCoordinates,
		getNextMoveDownCoordinates,
		renderShapeToPlayingField,
		deactivateActiveShape,
		clearFilledrows,
	]);

	useEffect(() => {
		const handleKeyPress = (event: KeyboardEvent) => {
			if (event.key === "ArrowLeft") {
				moveLeft();
			}
			if (event.key === "ArrowRight") {
				moveRight();
			}

			if (event.key === "ArrowDown") {
				moveDown();
			}
		};

		window.addEventListener("keydown", handleKeyPress);

		return () => {
			window.removeEventListener("keydown", handleKeyPress);
		};
	}, [moveLeft, moveRight, moveDown]);

	useEffect(() => {
		clearTimeout(gameTimeOutId.current);

		if (!gameInProgress) return;

		if (!activeShape) {
			const spawningShape = getRandomShape();
			const spawningShapeCoordinates = spawningShape.getSpawnCoordinates(
				spawnRowByShapeMap[spawningShape.name],
				SPAWN_SHAPE_COLUMN_INDEX
			);

			if (!canRenderAtCoordinates(spawningShapeCoordinates)) {
				renderShapeToPlayingField(spawningShape, spawningShapeCoordinates);
				deactivateActiveShape();
				clearActiveShape();
				clearTimeout(gameTimeOutId.current);
				setGamesInProgress(false);
				setGameOver(true);
				return;
			}

			renderShapeToPlayingField(spawningShape, spawningShapeCoordinates);

			if (!canRenderAtCoordinates(getNextMoveDownCoordinates())) {
				deactivateActiveShape();
				clearActiveShape();
				clearTimeout(gameTimeOutId.current);
				setGamesInProgress(false);
				setGameOver(true);
				return;
			}

			renderCommit();
			return;
		}

		/* 
			This handles issue when user can moveLeft | moveRight
			and be on the same row forever
		*/
		const passedTimeSinceMoveToSide =
			new Date().getTime() - movedToSideTime.current;

		if (passedTimeSinceMoveToSide > GAME_SPEED) {
			moveDown();
			movedToSideTime.current = NaN;
			return;
		}

		gameTimeOutId.current = setTimeout(() => {
			moveDown();
			movedToSideTime.current = NaN;
		}, GAME_SPEED);
	}, [
		gameInProgress,
		playingField,
		clearFilledrows,
		deactivateActiveShape,
		activeShape,
		canRenderAtCoordinates,
		getRandomShape,
		renderShapeToPlayingField,
		renderCommit,
		getNextMoveDownCoordinates,
		moveDown,
		clearActiveShape,
	]);

	const newGame = useCallback(() => {
		reset();
		setGamesInProgress(true);
		setGameOver(false);
	}, [reset]);

	const startGame = useCallback(() => {
		setGamesInProgress(true);
	}, []);

	return {
		tetrisPlayingField: playingField,
		gameInProgress,
		gameOver,
		newGame,
		startGame,
	};
}
