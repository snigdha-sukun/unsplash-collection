import { useState, useEffect } from "react";

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
		window.addEventListener("resize", windowResizeHandler);
		return () => {
			window.removeEventListener("resize", windowResizeHandler);
		};
	}, []);

	return windowDimensions;
};

export default useWindowDimensions;