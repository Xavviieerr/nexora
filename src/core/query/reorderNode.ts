import { Node } from "./types";

export function reorderNode(
	tree: Node,
	parentId: string,
	fromIndex: number,
	toIndex: number,
): Node {
	if (tree.type !== "group") {
		return tree;
	}

	if (tree.id === parentId) {
		const children = [...tree.children];

		const [moved] = children.splice(fromIndex, 1);

		if (!moved) {
			return tree;
		}

		children.splice(toIndex, 0, moved);

		return {
			...tree,
			children,
		};
	}

	return {
		...tree,
		children: tree.children.map((child) =>
			reorderNode(child, parentId, fromIndex, toIndex),
		),
	};
}
