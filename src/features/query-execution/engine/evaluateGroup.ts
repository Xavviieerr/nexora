import { GroupNode, Node } from "@/core/query/types";
import { evaluateRule } from "./evaluateRule";

function evaluateNode(node: Node, record: Record<string, any>): boolean {
	if (node.type === "rule") {
		return evaluateRule(node, record);
	}

	return evaluateGroup(node, record);
}

export function evaluateGroup(
	group: GroupNode,
	record: Record<string, any>,
): boolean {
	if (group.children.length === 0) return true;

	if (group.logic === "AND") {
		return group.children.every((child) => evaluateNode(child, record));
	}

	return group.children.some((child) => evaluateNode(child, record));
}
