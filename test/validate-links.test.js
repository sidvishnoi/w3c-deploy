// @ts-check
const main = require("../src/validate-links.js");

module.exports = validateLinks;
/** @param {import("./index.test.js").Output} outputs */
async function validateLinks(outputs) {
	const { links: shouldValidate = false } = outputs?.prepare?.validate || {};
	if (shouldValidate === false) {
		return;
	}

	const { dir = process.cwd(), file = "index.html" } =
		outputs?.build?.w3c || {};

	return await main({ dir, file });
}
