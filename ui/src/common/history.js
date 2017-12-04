import createHashHistory from "history/createHashHistory";
import queryString from "query-string";

export const history = createHashHistory();

function addLocationQuery(history) {
	history.location = Object.assign(history.location, {
		query: queryString.parse(history.location.search),
	});
}

addLocationQuery(history);

history.listen(() => {
	addLocationQuery(history);
});

export function replaceParams(newParams) {
	const { location } = history;
	const newLocation = `${location.pathname}?${queryString.stringify({
		...location.query,
		...newParams,
	})}`;
	history.push(newLocation);
}
