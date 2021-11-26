const chai = require("chai");
const chatHttp = require("chai-http");
const assert = chai.assert;

chai.should();

const { getTickets, getIndividualTicket } = require("../controllers/tickets_Request");

// Test the ticket request methods to Zendesk API.
describe("Ticket Requests", () => {
	// Reset mock environment variables
	let domain, user, password;
	beforeEach(() => {
		domain = process.env.DOMAIN;
		user = process.env.EMAIL;
		password = process.env.PASS;
	});
	// Test the getTickets() method if it functions correctly and throws appropriate errors.
	describe("GET tickets", () => {
		it("Incorrect request subdomain", async () => {
			try {
				domain = (Math.random() + 1).toString(36).substring(2);
				const { tickets, ticketCount } = await getTickets(domain, user, password, 1);
				assert.fail("Error not thrown for invalid request");
			} catch (err) {
				err.statusCode.should.equal(404);
			}
		});
		it("Incorrect user email", async () => {
			try {
				user = (Math.random() + 1).toString(36).substring(2);
				const { tickets, ticketCount } = await getTickets(domain, user, password, 1);
				assert.fail("Error not thrown for invalid request");
			} catch (err) {
				err.statusCode.should.equal(401);
			}
		});
		it("Incorrect user password", async () => {
			try {
				password = (Math.random() + 1).toString(36).substring(2);
				const { tickets, ticketCount } = await getTickets(domain, user, password, 1);
				assert.fail("Error not thrown for invalid request");
			} catch (err) {
				err.statusCode.should.equal(401);
			}
		});
		it("Valid request for tickets", async () => {
			try {
				const { tickets, ticketCount } = await getTickets(domain, user, password, 1);
				if (ticketCount > 0) {
					tickets.should.be.an("array");
					tickets.length.should.equal(Math.min(25, ticketCount));
				}
			} catch (err) {
				console.log(err);
				assert.fail("Error thrown for valid request");
			}
		});
	});

	// Test the getIndividualTicket() method if it functions correctly and throws appropriate errors.
	describe("GET individual tickets", () => {
		it("Incorrect request subdomain", () => {});
		it("Incorrect user email", () => {});
		it("Incorrect user password", () => {});
		it("Valid request for one ticket", () => {});
	});
});

// Test the ticket helper methods for /tickets route's controller.
describe("Tickets Helpers", () => {
	// Test the getPageNumber() method if it functions correctly and throws appropriate errors.
	describe("Get page number", () => {
		it("Invalid page string (Not a number)", () => {});
		it("Invalid page string (Empty)", () => {});
		it("Valid page string", () => {});
	});

	// Test the getPageRange() method if it functions correctly.
	describe("Get page range", () => {
		it("Page number is the first/last of available pages", () => {});
		it("Page range is larger than available pages", () => {});
		it("Page range is smaller than available pages", () => {});
	});
});
