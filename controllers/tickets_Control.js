const ExpressError = require("../utils/ExpressError");

const domain = process.env.DOMAIN;
const user = process.env.EMAIL;
const password = process.env.PASS;

//=================================================================================================

const { getAllTickets, getIndividualTicket } = require("./tickets_Request");
const { getPageNumber, getPageRange, getTicketsForPage } = require("./tickets_Helper");

const indexPage = async (req, res) => {
	const { page } = req.params;
	const ticketList = await getAllTickets(domain, user, password);

	try {
		const currPage = getPageNumber(page);
		const { tickets, pages } = getTicketsForPage(ticketList, page, 25);
		const { minPage, maxPage } = getPageRange(currPage, pages, 7);
		res.render("tickets/index", { tickets, currPage, minPage, maxPage });
	} catch (err) {
		console.log(err.message);
		throw new ExpressError(404, "Page Not Found");
	}
};

const showPage = async (req, res) => {
	const { id } = req.params;
	const ticket = await getIndividualTicket(domain, user, password, id);
	res.render("tickets/show", { ticket });
};

//=================================================================================================

module.exports = { indexPage, showPage };
