/**
 * Response handler
 */

module.exports = {

	send_response_json: function (res, message, statusCode = 200) {
		res.status(statusCode).json({status: "ok", response: message});
	},

	send_error_json: function (res, message, statusCode = 200) {
		console.log("Error: message --------->", statusCode, JSON.stringify(message));
		res.status(statusCode).json({status: "err", error: message});
	}

};
