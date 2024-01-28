const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const config = require("../config/config")

dotenv.config();

// This function is used as middleware to authenticate user requests
const auth = async (req, res, next) => {	
	
	try {
      
		// Extracting JWT from request cookies, body or header
		const token = req.header("Authorization").replace("Bearer ", "");
		
	     
		// If JWT is missing, return 401 Unauthorized response
		if (!token) {
			return res.status(401).json({ success: false, message: `Token Missing` });
		}	
		
		const decode = jwt.verify(token, config.jwt.secret);
		
			// Storing the decoded JWT payload in the request object for further use
			req.user = decode;

		// try {
		// 	// Verifying the JWT using the secret key stored in environment variables
		// 	// const decode = await jwt.verify(token, process.env.JWT_SECRET);
        //     const decode = await jwt.verify(token, config.JWT_SECRET);
		// 	console.log(decode);
		// 	// Storing the decoded JWT payload in the request object for further use
		// 	req.user = decode;
		// } catch (error) {
		// 	// If JWT verification fails, return 401 Unauthorized response
		// 	return res
		// 		.status(401)
		// 		.json({ success: false, message: "token is invalid" });
		// }

		// If JWT is valid, move on to the next middleware or request handler		
		next();
		
	} catch (error) {
		// If there is an error during the authentication process, return 401 Unauthorized response
		console.log(error);
		return res.status(401).json({
			success: false,
			message: `Something Went Wrong While Validating the Token`,
		});
	}
};

module.exports = auth;

// const jwt = require("jsonwebtoken");
// // const dotenv = require("dotenv");
// const config = require("./config/config")

// // dotenv.config();

// // This function is used as middleware to authenticate user requests
// const auth = async (req, res, next) => {
// 	try {
// 		// Extracting JWT from request cookies, body or header
// 		const token =
// 			req.cookies.token ||
// 			req.body.token ||
// 			req.header("Authorization").replace("Bearer ", "");

// 		// If JWT is missing, return 401 Unauthorized response
// 		if (!token) {
// 			return res.status(401).json({ success: false, message: `Token Missing` });
// 		}

// 		try {
// 			// Verifying the JWT using the secret key stored in environment variables
// 			// const decode = await jwt.verify(token, process.env.JWT_SECRET);
//             const decode = await jwt.verify(token, config.JWT_SECRET);
// 			console.log(decode);
// 			// Storing the decoded JWT payload in the request object for further use
// 			req.user = decode;
// 		} catch (error) {
// 			// If JWT verification fails, return 401 Unauthorized response
// 			return res
// 				.status(401)
// 				.json({ success: false, message: "token is invalid" });
// 		}

// 		// If JWT is valid, move on to the next middleware or request handler
// 		next();
// 	} catch (error) {
// 		// If there is an error during the authentication process, return 401 Unauthorized response
// 		return res.status(401).json({
// 			success: false,
// 			message: `Something Went Wrong While Validating the Token`,
// 		});
// 	}
// };

// module.exports = auth;

