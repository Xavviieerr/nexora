import { Node, RuleNode, GroupNode } from "./types";

export function createRuleNode(): RuleNode {
	return {
		id: crypto.randomUUID(),
		type: "rule",
		field: "",
		operator: "eq",
		value: "",
	};
}

export function createGroupNode(id?: string): GroupNode {
	return {
		id: id ?? crypto.randomUUID(),
		type: "group",
		logic: "AND",
		children: [],
	};
}
