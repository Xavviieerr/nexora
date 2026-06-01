import { describe, it, expect } from "vitest";
import { updateNode } from "./updateNode";
import { createGroupNode, createRuleNode } from "./createNode";

describe("updateNode", () => {
	it("updates a rule node correctly", () => {
		const rule = createRuleNode();

		const tree = createGroupNode();
		tree.children.push(rule);

		const updated = updateNode(tree, rule.id, (node) => {
			if (node.type !== "rule") return node;
			return { ...node, value: 100 };
		});

		if (updated.type !== "group") throw new Error("Expected a group node");

		const updatedRule = updated.children[0];

		expect(updatedRule.type).toBe("rule");
		if (updatedRule.type === "rule") {
			expect(updatedRule.value).toBe(100);
		}
	});

	it("does not mutate original tree", () => {
		const tree = createGroupNode();
		const original = JSON.parse(JSON.stringify(tree));

		updateNode(tree, tree.id, (node) => node);

		expect(tree).toEqual(original);
	});
});
