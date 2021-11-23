const axios = require("axios");
const ExpressError = require("../utils/ExpressError");

const domain = process.env.DOMAIN;
const user = process.env.EMAIL;
const password = process.env.PASS;

//=================================================================================================

const getAdjPages = (currPage, maxPage) => {
	let nextPage, prevPage;

	nextPage = prevPage = 0;

	if (maxPage > currPage) {
		nextPage = currPage + 1;
	}
	if (currPage > 1) {
		prevPage = currPage - 1;
	}
	return { prevPage, nextPage };
};

const getAllTickets = async () => {
	let page = 1;
	let options = {
		url: `https://${domain}.zendesk.com/api/v2/tickets.json`,
		method: "GET",
		auth: {
			username: `${user}`,
			password: `${password}`,
		},
		params: {
			page: `${page}`,
		},
	};
	let resp = await axios(options);
	let ticketList = resp.data.tickets;
	while (resp.data.next_page != null) {
		options.params.page = ++page;
		resp = await axios(options);
		ticketList = ticketList.concat(resp.data.tickets);
	}
	return ticketList;
};

//=================================================================================================

const indexPage = async (req, res) => {
	const perPage = 25;

	let { page } = req.params;
	const reg = new RegExp("^[0-9]+$");
	if (!reg.test(page)) throw new ExpressError(404, "Page Not Found");
	const currPage = parseInt(page);

	const ticketList = await getAllTickets();

	const maxPage = Math.ceil(ticketList.length / perPage);
	if (maxPage < currPage && currPage !== 1) throw new ExpressError(404, "Page Not Found");

	const tickets = ticketList.slice(
		perPage * (currPage - 1),
		Math.min(ticketList.length, perPage * currPage)
	);
	const { prevPage, nextPage } = getAdjPages(currPage, maxPage);

	res.render("tickets/index", { tickets, prevPage, nextPage });
};

const showPage = async (req, res) => {
	const { id } = req.params;
	const options = {
		url: `https://${domain}.zendesk.com/api/v2/tickets/${id}.json`,
		method: "GET",
		auth: {
			username: `${user}`,
			password: `${password}`,
		},
	};

	const resp = await axios(options);
	const ticket = resp.data.ticket;
	res.render("tickets/show", { ticket });
};

//=================================================================================================

module.exports = { indexPage, showPage };
