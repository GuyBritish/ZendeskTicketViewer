const ExpressError = require("../utils/ExpressError");

//=================================================================================================

/**
 * Get the page number from a string. Throws a custom error if the string is invalid.
 *
 * @param {string} page The page number string.
 * @returns the page number.
 */
const getPageNumber = (page) => {
	const reg = new RegExp("^[0-9]+$");
	if (!reg.test(page)) throw new ExpressError(404, "Page Not Found");
	return parseInt(page);
};

/**
 * Get the available page range around the current page number.
 *
 * @param {int} currPage The current page number.
 * @param {int} count The amount of items.
 * @param {int} perPage The amount of items in a page.
 * @param {int} range The maximum page range (left/right) .
 * @returns the leftmost and rightmost page numbers in the range.
 */
const getPageRange = (currPage, count, perPage, range) => {
	const pages = Math.ceil(count / perPage);
	range = Math.abs(range);
	let maxPage = Math.min(currPage + range, Math.max(currPage, pages));
	let minPage = Math.max(currPage - range, Math.min(currPage, 1));
	return { minPage, maxPage };
};

//=================================================================================================

module.exports = { getPageNumber, getPageRange };
