/**
 * Custom error object with status code and message.
 */
class ExpressError extends Error {
	/**
	 * @param {int} statusCode
	 * @param {string} message
	 */
	constructor(statusCode, message) {
		super();
		this.statusCode = statusCode;
		this.message = message;
	}
}

//=================================================================================================

module.exports = ExpressError;
