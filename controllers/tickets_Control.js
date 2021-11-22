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
	const ticketList = resp.tickets;
	res.render("tickets/index", { ticketList });
};

//=================================================================================================

module.exports = { indexPage };
