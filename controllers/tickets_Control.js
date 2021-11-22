const axios = require("axios");

const domain = process.env.DOMAIN;
const user = process.env.EMAIL;
const password = process.env.PASS;

//=================================================================================================

const indexPage = async (req, res) => {
	const options = {
		url: `https://${domain}.zendesk.com/api/v2/tickets.json`,
		method: "GET",
		auth: {
			username: `${user}`,
			password: `${password}`,
		},
	};

	const resp = await axios(options);
	const ticketList = resp.data.tickets;
	res.render("tickets/index", { ticketList });
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
