import { Node } from "./types";

export function isValidNode(value: unknown): value is Node {
	if (!value || typeof value !== "object") {
		return false;
	}

	const node = value as Record<string, unknown>;

	if (typeof node.id !== "string" || typeof node.type !== "string") {
		return false;
	}

	if (node.type === "rule") {
		return typeof node.field === "string" && typeof node.operator === "string";
	}

	if (node.type === "group") {
		if (!Array.isArray(node.children)) {
			return false;
		}

		return node.children.every((child) => isValidNode(child));
	}

	return false;
}
