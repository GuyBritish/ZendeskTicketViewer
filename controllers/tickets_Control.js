// Get Zendesk account from environment
const domain = process.env.DOMAIN;
const user = process.env.EMAIL;
const password = process.env.PASS;

//=================================================================================================

const { getTickets, getIndividualTicket } = require("./tickets_Request");
const { getPageNumber, getPageRange } = require("./tickets_Helper");

// Ticket list page
const indexPage = async (req, res) => {
	const { page } = req.params;
	const currPage = getPageNumber(page);

	const { tickets, ticketCount } = await getTickets(domain, user, password, currPage); // Request the list of tickets in currPage
	const { minPage, maxPage } = getPageRange(currPage, ticketCount, 25, 7); // Get page range for pagination

	res.render("tickets/index", { tickets, currPage, minPage, maxPage }); // Pass a list of ticket objects and page numbers for pagination
};

// Ticket details page
const showPage = async (req, res) => {
	const { id } = req.params;

	const ticket = await getIndividualTicket(domain, user, password, id); // Request a ticket with id

	res.render("tickets/show", { ticket }); // Pass a ticket object
};

//=================================================================================================

module.exports = { indexPage, showPage };
