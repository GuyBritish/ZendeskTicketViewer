const indexPage = async (req, res) => {
	const tickets = [1, 2, 3];
	res.render("tickets/index", { tickets });
};

//=================================================================================================

module.exports = { indexPage };
