export default function getCookieServer(context, name) {
	// Split cookie string and get all individual name=value pairs in an array
	let cookies = context.req.headers.cookie;

	if (!cookies) {
		return null;
	}
	let cookieArr = cookies.split(";");

	// Loop through the array elements
	for (let i = 0; i < cookieArr.length; i++) {
		let cookiePair = cookieArr[i].split("=");

		/* Removing whitespace at the beginning of the cookie name
        and compare it with the given string */
		if (name == cookiePair[0].trim()) {
			// Decode the cookie value and return
			return decodeURIComponent(cookiePair[1]);
		}
	}

	// Return null if not found
	return null;
}
