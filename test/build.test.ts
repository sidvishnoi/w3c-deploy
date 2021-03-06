import main from "../src/build.js";
import { Outputs } from "./index.test.js";

export default async function build(outputs: Outputs) {
	const {
		toolchain = "respec",
		source = { dir: "", file: "index.html", path: "index.html" },
		destination = { dir: "", file: "index.html", path: "index.html" },
		flags = ["-e"],
		configOverride = { w3c: { dir: "", file: "" }, gh: null },
	} = outputs?.prepare?.build || {};

	return await main({ toolchain, source, destination, flags, configOverride });
}
