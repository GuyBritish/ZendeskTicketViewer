const axios = require("axios");
const ExpressError = require("../utils/ExpressError");

//=================================================================================================

const getTickets = async (domain, user, password, page) => {
	let options = {
		url: `https://${domain}.zendesk.com/api/v2/tickets.json`,
		method: "GET",
		auth: {
			username: `${user}`,
			password: `${password}`,
		},
		params: {
			per_page: `25`,
			page: `${page}`,
		},
	};
	try {
		let resp = await axios(options);
		const tickets = resp.data.tickets;
		const ticketCount = resp.data.count;
		return { tickets, ticketCount };
	} catch (err) {
		let error = new ExpressError();
		if (err.response) {
			error.statusCode = err.response.status;
			error.message = err.response.data.error.message || err.response.data.error;
		}
		throw error;
	}
};

const getIndividualTicket = async (domain, user, password, id) => {
	const options = {
		url: `https://${domain}.zendesk.com/api/v2/tickets/${id}.json`,
		method: "GET",
		auth: {
			username: `${user}`,
			password: `${password}`,
		},
	};

	try {
		const resp = await axios(options);
		return resp.data.ticket;
	} catch (err) {
		let error = new ExpressError();
		if (err.response) {
			error.statusCode = err.response.status;
			error.message = err.response.data.error.message || err.response.data.error;
		}
		throw error;
	}
};

//=================================================================================================

module.exports = { getTickets, getIndividualTicket };
