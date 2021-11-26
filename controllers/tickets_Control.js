const ExpressError = require("../utils/ExpressError");

const domain = process.env.DOMAIN;
const user = process.env.EMAIL;
const password = process.env.PASS;

//=================================================================================================

const { getAllTickets, getIndividualTicket } = require("./tickets_Request");
const { getPageNumber, getPageRange } = require("./tickets_Helper");

const indexPage = async (req, res) => {
	const { page } = req.params;

	try {
		const currPage = getPageNumber(page);
		const { tickets, ticketCount } = await getAllTickets(domain, user, password, currPage);
		const { minPage, maxPage } = getPageRange(currPage, ticketCount, 25, 7);
		res.render("tickets/index", { tickets, currPage, minPage, maxPage });
	} catch (err) {
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
