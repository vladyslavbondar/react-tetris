import { memo } from "react";
import { TetrisPixel } from "../classes";

interface TetrisNodeProps extends TetrisPixel {
	isTransparent?: boolean;
}

export const TetrisNode = memo(({ colour, isTransparent }: TetrisNodeProps) => {
	return (
		<div
			className={`w-6 h-6 border ${
				isTransparent ? "border-transparent" : "border-[#F2F2F2]"
			}`}
			style={getBackgroundStyles(colour)}
		/>
	);
});

function getBackgroundStyles(colour: string | null) {
	if (!colour) return {};

	return { background: colour };
}
