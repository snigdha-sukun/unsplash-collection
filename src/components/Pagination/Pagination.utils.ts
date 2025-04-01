export const getPageRange = (currentPage: number, totalPages: number) => {
	let start = Math.max(1, currentPage - 2);
	let end = Math.min(totalPages, currentPage + 2);

	if (currentPage <= 3) {
		end = Math.min(5, totalPages);
	} else if (currentPage >= totalPages - 2) {
		start = Math.max(totalPages - 4, 1);
	}

	return { start, end };
};
