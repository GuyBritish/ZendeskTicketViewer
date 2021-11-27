const axios = require("axios");
const ExpressError = require("../utils/ExpressError");

//=================================================================================================

/**
 * Request the tickets in a specified page. Throws a custom error with friendly message if an
 * erroneous response is received.
 *
 * @param {string} domain The subdomain for the request url.
 * @param {string} user The user email for request authentication.
 * @param {string} password The password for request authentication.
 * @param {int} page The page that will be requested.
 * @returns A list of ticket objects.
 */
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
		// Get error code and message from API response.
		if (err.response) {
			error.statusCode = err.response.status;
			error.message = err.response.data.error.message || err.response.data.error;
		}
		throw error;
	}
};

/**
 * Request a single ticket with a specified ID. Throws a custom error with friendly message if an
 * erroneous response is received.
 *
 * @param {string} domain The subdomain for the request url.
 * @param {string} user The user email for request authentication.
 * @param {string} password The password for request authentication.
 * @param {int} id The ticket ID that will be requested.
 * @returns A ticket object.
 */
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
		// Get error code and message from API response.
		if (err.response) {
			error.statusCode = err.response.status;
			error.message = err.response.data.error.message || err.response.data.error;
		}
		throw error;
	}
};

//=================================================================================================

module.exports = { getTickets, getIndividualTicket };
