import { Node } from "@/core/query/types";
import { isValidNode } from "@/core/query/isValidNode";

export function importQuery(json: string): Node {
	const parsed: unknown = JSON.parse(json);

	if (!isValidNode(parsed)) {
		throw new Error("Invalid query structure");
	}

	return parsed;
}
