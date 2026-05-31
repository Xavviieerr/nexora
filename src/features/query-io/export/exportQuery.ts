import { Node } from "@/core/query/types";

export function exportQuery(tree: Node) {
	return JSON.stringify(tree, null, 2);
}
