// @ts-check

module.exports = prepare;
async function prepare() {
	const INPUTS_USER = {
		SOURCE: "",
		TOOLCHAIN: "respec",
		BUILD_FAIL_ON: "fatal",
		W3C_BUILD_OVERRIDE: [
			"specStatus: WD",
			"shortName: my-custom-shortname",
			"previousMaturity: LC",
			"previousPublishDate: 2014-05-01",
		].join("\n"),
		GH_PAGES_BUILD_OVERRIDE: "specStatus: ED\n",
		VALIDATE_LINKS: "false",
		VALIDATE_MARKUP: "",
		GH_PAGES_BRANCH: "",
		W3C_ECHIDNA_TOKEN: "",
		W3C_MANIFEST_URL: "",
		W3C_WG_DECISION_URL: "",
		W3C_NOTIFICATIONS_CC: "",
	};
	const INPUTS_GITHUB = {
		event_name: "push",
		repository: "sidvishnoi/w3c-deploy-test",
		event: { repository: { default_branch: "main", has_pages: false } },
		token: "GITHUB_TOKEN",
		sha: "HEAD^",
		actor: "GITHUB_ACTOR",
	};
	return await require("../src/prepare.js")(INPUTS_USER, INPUTS_GITHUB);
}
