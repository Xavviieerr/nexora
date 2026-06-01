import { Node } from "./types";

export function traverseTree(node: Node, visit: (node: Node) => void) {
	visit(node);

	if (node.type === "group") {
		node.children.forEach((child) => traverseTree(child, visit));
	}
}
