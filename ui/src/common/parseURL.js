export function parseURL(props) {
	const { page = 0, size = 20, sort = "id" } = props.params;
	return { page: Number(page), size: Number(size), sort };
}
