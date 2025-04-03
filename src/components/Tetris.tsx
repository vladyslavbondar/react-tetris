import { useCallback } from "react";
import { useTetrisGame } from "../hooks";
import { TetrisNode } from "./TetrisNode";

export function Tetris() {
	const { tetrisPlayingField, gameInProgress, gameOver, newGame, startGame } =
		useTetrisGame();

	const handleInitateGame = useCallback(() => {
		if (gameOver) {
			newGame();
		} else {
			startGame();
		}
	}, [gameOver, newGame, startGame]);

	return (
		<div className="flex flex-col items-center">
			<div className="flex relative w-full justify-center">
				{!gameInProgress ? (
					<button
						className="bg-[#F9F9F9] rounded-sm px-3 py-2 absolute top-8"
						onClick={handleInitateGame}>
						{gameOver ? "New game" : "Start game"}
					</button>
				) : null}
			</div>
			<div className="grid grid-cols-10 ">
				{tetrisPlayingField.map((tetrisPixelsRow, rowIndex) =>
					tetrisPixelsRow.map((tetrisPixelColumn) => (
						<TetrisNode
							key={tetrisPixelColumn.id}
							{...tetrisPixelColumn}
							isTransparent={
								rowIndex === 0 ||
								rowIndex === 1 ||
								rowIndex === 2 ||
								rowIndex === 3
							}
						/>
					))
				)}
			</div>
		</div>
	);
}
