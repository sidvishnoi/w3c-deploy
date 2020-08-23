// @ts-check
const { execSync } = require("child_process");

/**
 * @param {string} path
 */
function addPath(path) {
	console.log(`::add-path::${path}`);
}

/**
 * @param {string} message
 * @param {number} [code]
 */
function exit(message, code = 1) {
	if (code === 0) {
		console.log(message);
	} else {
		console.error(message);
	}
	process.exit(code);
}

/**
 * @param {string} text
 */
function formatAsHeading(text) {
	const marker = "=".repeat(Math.max(50, text.length));
	return `${marker}\n${text}:\n${marker}`;
}

/**
 * @param {string} key
 * @param {string} value
 */
function setEnv(key, value) {
	console.log(`::set-env name=${key}::${value}`);
}

/**
 * @param {string} key
 * @param {string} value
 */
function setOutput(key, value) {
	console.log(`::set-output name=${key}::${value}`);
}

/**
 * Synchronously run a shell command get its result.
 * @param {string} command
 */
function sh(command, options = {}) {
	return execSync(command, { encoding: "utf-8", ...options }).trim();
}

function yesOrNo(value) {
	const str = String(value).trim();
	if (/^(?:y|yes|true|1|on)$/i.test(str)) {
		return true;
	}
	if (/^(?:n|no|false|0|off)$/i.test(value)) {
		return false;
	}
}

module.exports = {
	addPath,
	exit,
	formatAsHeading,
	setEnv,
	setOutput,
	sh,
	yesOrNo,
};
