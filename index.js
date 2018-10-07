import postcss from "postcss";
import {tokenRegex} from "./lib/tokenRegex";

var dollarIdent = "$0";

function getKeyword(root) {
	let keywords = [];

	// Look for every keyword definition
	root.walkAtRules("value", rule => {
		// Create object so can look for keywords in CSS
		let keyword = {};
		let propsArray = [];
		let propertyThing = /property\((.+)\)/;

		rule.each(decl => {

			// Grab value
		  if (decl.prop === "value") {
				keyword.value = decl.value;
			}


			// Grab array of properties
			if (rule.params.match(propertyThing)) {
				let array = rule.params.match(propertyThing)[1].split(",");
				for (let i = 0; i < array.length; i++) {
					propsArray.push(array[i].trim())
				}
			}

		});

		// Create regex to allow matching of properties
		keyword.props = new RegExp(propsArray.join("|"), 'i');

		// Create regex to replace instances of word in declaration value
		let nameString = rule.params.toString();
		let name = nameString.replace(propertyThing, "").trim();
		keyword.name = tokenRegex(name);

		keywords.push(keyword);
	});

	// Reverse array so that keyword definitions that are declared later in document overide earlier rules
	keywords.reverse();
	return keywords;
}

export default postcss.plugin("postcss-custom-value", () => {

	return root => {
		// console.log("root, result", root, result);
		const keywords = getKeyword(root);

		// For each keyword definition
		for (let i = 0; i < keywords.length; i++) {
			let keyword = keywords[i];

			// For each declration with matching properties
			root.walkDecls(keyword.props, decl => {

				// If value
				if (decl.value.match(keyword.name)) {


					// Replace instances of keyword name with correct value
					var array1 = postcss.list.space(decl.value);
					for (let b = 0; b < array1.length; b++) {
						if (array1[b].match(keyword.name)) {
							array1[b] = keyword.value.replace(dollarIdent, array1[b].match(keyword.name)[1]);

						}

					}

					decl.value = array1.join(" ");
				}

			});
		}
		root.walkAtRules("value", rule => {
			rule.remove();
		});
	};
});
