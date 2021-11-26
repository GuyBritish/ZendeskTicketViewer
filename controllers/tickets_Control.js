const domain = process.env.DOMAIN;
const user = process.env.EMAIL;
const password = process.env.PASS;

//=================================================================================================

const { getTickets, getIndividualTicket } = require("./tickets_Request");
const { getPageNumber, getPageRange } = require("./tickets_Helper");

const indexPage = async (req, res) => {
	const { page } = req.params;

	const currPage = getPageNumber(page);
	const { tickets, ticketCount } = await getTickets(domain, user, password, currPage);
	const { minPage, maxPage } = getPageRange(currPage, ticketCount, 25, 7);

	res.render("tickets/index", { tickets, currPage, minPage, maxPage });
};

const showPage = async (req, res) => {
	const { id } = req.params;

	const ticket = await getIndividualTicket(domain, user, password, id);

	res.render("tickets/show", { ticket });
};

//=================================================================================================

module.exports = { indexPage, showPage };
