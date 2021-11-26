const getPageNumber = (page) => {
	const reg = new RegExp("^[0-9]+$");
	if (!reg.test(page)) throw new Error("Invalid page string!");
	return parseInt(page);
};

const getPageRange = (currPage, count, perPage, range) => {
	const pages = Math.ceil(count / perPage);
	range = Math.abs(range);
	let maxPage = Math.min(currPage + range, Math.max(currPage, pages));
	let minPage = Math.max(currPage - range, Math.min(currPage, 1));
	return { minPage, maxPage };
};

//=================================================================================================

module.exports = { getPageNumber, getPageRange };