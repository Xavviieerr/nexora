import { Node } from "./types";

export function updateNode(
	tree: Node,
	nodeId: string,
	updater: (node: Node) => Node,
): Node {
	if (tree.id === nodeId) {
		return updater(tree);
	}

	if (tree.type === "group") {
		return {
			...tree,
			children: tree.children.map((child) =>
				updateNode(child, nodeId, updater),
			),
		};
	}

	return tree;
}
