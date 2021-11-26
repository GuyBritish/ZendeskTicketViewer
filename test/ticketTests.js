const chai = require("chai");
const chatHttp = require("chai-http");
const should = chai.should();

// Test the ticket request methods to Zendesk API.
describe("Ticket Requests", () => {
	// Test the getAllTickets() method if it functions correctly and throws appropriate errors.
	describe("GET all tickets", () => {
		it("Incorrect request subdomain", () => {});
		it("Incorrect user email", () => {});
		it("Incorrect user password", () => {});
		it("Valid request for all tickets", () => {});
	});

	// Test the getIndividualTicket() method if it functions correctly and throws appropriate errors.
	describe("GET individual tickets", () => {
		it("Incorrect request subdomain", () => {});
		it("Incorrect user email", () => {});
		it("Incorrect user password", () => {});
		it("Valid request for one ticket", () => {});
	});
});
