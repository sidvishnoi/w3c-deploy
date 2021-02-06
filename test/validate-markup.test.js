// @ts-check

module.exports = validateMarkup;
async function validateMarkup(outputs = {}) {
	const validate = outputs?.prepare?.all?.validate;
	if (validate && validate.markup === false) {
		return;
	}

	const build = outputs?.build?.w3c || {};
	const outputDir = build.dir || ".";

	return await require("../src/validate-markup.js")(outputDir);
}
