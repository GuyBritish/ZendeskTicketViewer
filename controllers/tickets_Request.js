const axios = require("axios");

//=================================================================================================

const getAllTickets = async (domain, user, password) => {
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

const getIndividualTicket = async (domain, user, password, id) => {
	const options = {
		url: `https://${domain}.zendesk.com/api/v2/tickets/${id}.json`,
		method: "GET",
		auth: {
			username: `${user}`,
			password: `${password}`,
		},
	};

	const resp = await axios(options);
	return resp.data.ticket;
};

//=================================================================================================

module.exports = { getAllTickets, getIndividualTicket };
