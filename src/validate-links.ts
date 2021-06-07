import { env, exit, install, sh, yesOrNo } from "./utils.js";
import { PUPPETEER_ENV } from "./constants.js";
import { BuildResult } from "./build.js";
import path = require("path");
type Input = Pick<BuildResult, "dest" | "file">;

const permaIgnore = [
	// Doesn't like robots
	"https://ev.buaa.edu.cn/",
];

if (module === require.main) {
	if (yesOrNo(env("INPUTS_VALIDATE_LINKS")) === false) {
		exit("Skipped", 0);
	}

	const input: Input = JSON.parse(env("OUTPUTS_BUILD"));
	main(input).catch(err => exit(err.message || "Failed", err.code));
}

export default async function main({ dest, file }: Input) {
	await install("link-checker");
	// Validator checks a directory, not a file.
	const dir = path.dirname(file);
	const useGet = yesOrNo(env("INPUTS_VALIDATE_LINKS_USE_GET"))
		? "--http-always-get"
		: "";
	const ignoreUrls = env("INPUTS_VALIDATE_LINKS_IGNORE_URLS")
		? env("INPUTS_VALIDATE_LINKS_IGNORE_URLS").split(" ")
		: [];
	const ignoreList = makeIgnoreParams([...permaIgnore, ...ignoreUrls]);
	await sh(
		`link-checker ${ignoreList} --http-timeout=50000 --http-redirects=3 ${dir}`,
	);
}

function makeIgnoreParams(ignoreList: string[]) {
	return ignoreList.map(url => `--url-ignore="${url}"`).join(" ");
}
