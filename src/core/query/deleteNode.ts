import { Node } from "./types";

export function deleteNode(tree: Node, nodeId: string): Node | null {
	if (tree.id === nodeId) return null;

	if (tree.type === "group") {
		const filtered = tree.children
			.map((child) => deleteNode(child, nodeId))
			.filter(Boolean) as Node[];

		return {
			...tree,
			children: filtered,
		};
	}

	return tree;
}
