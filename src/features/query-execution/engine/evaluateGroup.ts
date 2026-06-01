import { GroupNode, Node } from "@/core/query/types";
import { evaluateRule } from "./evaluateRule";
import { QueryRecord } from "../types";

function evaluateNode(node: Node, record: QueryRecord): boolean {
	if (node.type === "rule") {
		return evaluateRule(node, record);
	}

	return evaluateGroup(node, record);
}

export function evaluateGroup(group: GroupNode, record: QueryRecord): boolean {
	if (group.children.length === 0) return true;

	if (group.logic === "AND") {
		return group.children.every((child) => evaluateNode(child, record));
	}

	return group.children.some((child) => evaluateNode(child, record));
}
