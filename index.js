if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}

const express = require("express");
const path = require("path");
const ejsMate = require("ejs-mate");

//=================================================================================================

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.engine("ejs", ejsMate);

//=================================================================================================

const ticketsRoutes = require("./routes/tickets");

app.get("/", (req, res) => {
	res.render("home");
});

app.use("/tickets", ticketsRoutes);

app.use((err, req, res, next) => {
	const { statusCode = 500, message = "Something went wrong!" } = err;
	if (!err.statusCode) {
		err.statusCode = 500;
	}
	if (!err.message) {
		err.message = "Something went wrong!";
	}
});

//=================================================================================================

const Port = process.env.PORT || 3000;

app.listen(Port, () => {
	console.log(`TicketViewer is listening on port ${Port}`);
});
