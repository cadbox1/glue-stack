export const parsePaginationParameters = ({
	page = 0,
	size = 20,
	sort = "id",
}) => ({ page: Number(page), size: Number(size), sort });
