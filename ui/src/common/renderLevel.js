import { history } from "common/history";

const renderLevel = level => {
	const isLargeScreen = true;
	const levels = (history.location.pathname.match(new RegExp("/", "g")) || [])
		.length;
	const maxLevels = isLargeScreen ? 2 : 1;
	return level > levels - maxLevels;
};

export { renderLevel };
