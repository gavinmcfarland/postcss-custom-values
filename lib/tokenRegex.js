import tokens from "./tokens.js";

var genericToken = /<(\w+)>/;

export function tokenRegex(string) {
	// Takes string where token is referenced as ident eg. layout_<direction>

	let regex;

	if (string.match(genericToken)) {
		// Create array with regex for standard token and capture name
		let ident = [string.match(genericToken)[0], string.match(genericToken)[1]];
		// For each token definition
		for (let i = 0; i < tokens.length; i++) {
			// If defined token matches ident
			if ( tokens[i].name === ident[1]) {

				// Create a regex which can be used to find matching things and capture value
				regex = new RegExp(string.replace(genericToken, "(" + tokens[i].regex.source + ")"));
			}
		}
	}
	else {
		regex = new RegExp("\\b" + string + "\\b", 'gi');
	}

	// Outputs regex that looks for exact match of string plus token eg. /layout_(left|right)/
	return regex;
}

// export function tokenMatches(string, regex) {
// 	return string.match(regex)[1];
// }
