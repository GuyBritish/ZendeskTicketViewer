const chai = require("chai");
const chatHttp = require("chai-http");
const should = chai.should();

// Test the ticket request methods to Zendesk API.
describe("Ticket Requests", () => {
	// Test the getTickets() method if it functions correctly and throws appropriate errors.
	describe("GET tickets", () => {
		it("Incorrect request subdomain", () => {});
		it("Incorrect user email", () => {});
		it("Incorrect user password", () => {});
		it("Valid request for tickets", () => {});
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
