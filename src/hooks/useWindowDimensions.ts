import { useState, useEffect } from "react";

/*global window*/

const getWindowDimensions = () => {
	const { innerWidth: width, innerHeight: height } = window;

	return { width, height };
};

const useWindowDimensions = () => {
	type WindowDimensions = {
		width: number | undefined;
		height: number | undefined;
	};

	const [windowDimensions, setWindowDimensions] = useState<WindowDimensions>({
		width: undefined,
		height: undefined,
	});

	useEffect(() => {
		const windowResizeHandler = () => {
			setWindowDimensions(getWindowDimensions());
		};
		windowResizeHandler();
		// initial grab of dimensions on mount

		window.addEventListener("resize", windowResizeHandler);
		// add event listener for window changes

		return () => {
			window.removeEventListener("resize", windowResizeHandler);
		};
	}, []);

	return windowDimensions;
};

export default useWindowDimensions;