const getPageNumber = (page) => {
	const reg = new RegExp("^[0-9]+$");
	if (!reg.test(page)) throw new Error("Invalid page string!");
	return parseInt(page);
};

const getPageRange = (currPage, pages, range) => {
	range = Math.abs(range);
	let maxPage = Math.min(currPage + range, Math.max(currPage, pages));
	let minPage = Math.max(currPage - range, Math.min(currPage, 1));
	return { minPage, maxPage };
};

const getTicketsForPage = (ticketList, currPage, perPage) => {
	const pages = Math.ceil(ticketList.length / perPage);

	if (pages < currPage && currPage !== 1) throw new Error("Invalid page number!");

	const tickets = ticketList.slice(
		perPage * (currPage - 1),
		Math.min(ticketList.length, perPage * currPage)
	);
	return { tickets, pages, currPage };
};

//=================================================================================================

module.exports = { getPageNumber, getPageRange, getTicketsForPage };
