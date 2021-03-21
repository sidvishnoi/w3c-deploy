import * as path from "path";
import main from "../src/validate-markup.js";
import { Outputs } from "./index.test.js";

export default async function validateMarkup(outputs: Outputs) {
	const { markup: shouldValidate = false } = outputs?.prepare?.validate || {};
	if (shouldValidate === false) {
		return;
	}

	const { root = process.cwd(), dir = "", file = "index.html" } =
		outputs?.build?.w3c || {};

	return await main({ root, dir, file });
}
