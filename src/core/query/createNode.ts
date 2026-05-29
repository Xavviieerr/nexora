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

export function createGroupNode(): GroupNode {
	return {
		id: crypto.randomUUID(),
		type: "group",
		logic: "AND",
		children: [],
	};
}
