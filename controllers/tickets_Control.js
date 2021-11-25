const axios = require("axios");
const ExpressError = require("../utils/ExpressError");

const domain = process.env.DOMAIN;
const user = process.env.EMAIL;
const password = process.env.PASS;

//=================================================================================================

const getPageRange = (currPage, pages, range) => {
	range = Math.abs(range);
	let maxPage = Math.min(currPage + range, Math.max(currPage, pages));
	let minPage = Math.max(currPage - range, Math.min(currPage, 1));
	return { minPage, maxPage };
};

//=================================================================================================

const { getAllTickets, getIndividualTicket } = require("./tickets_Request");

const indexPage = async (req, res) => {
	const perPage = 25;

	let { page } = req.params;
	const reg = new RegExp("^[0-9]+$");
	if (!reg.test(page)) throw new ExpressError(404, "Page Not Found");
	const currPage = parseInt(page);

	const ticketList = await getAllTickets(domain, user, password);

	const pages = Math.ceil(ticketList.length / perPage);
	if (pages < currPage && currPage !== 1) throw new ExpressError(404, "Page Not Found");

	const tickets = ticketList.slice(
		perPage * (currPage - 1),
		Math.min(ticketList.length, perPage * currPage)
	);
	const { minPage, maxPage } = getPageRange(currPage, pages, 7);

	res.render("tickets/index", { tickets, currPage, minPage, maxPage });
};

const showPage = async (req, res) => {
	const { id } = req.params;
	const ticket = await getIndividualTicket(domain, user, password, id);
	res.render("tickets/show", { ticket });
};

//=================================================================================================

module.exports = { indexPage, showPage };
