import { reorderNode } from "../../core/query/reorderNode";
import { createGroupNode, createRuleNode } from "../../core/query/createNode";

describe("reorderNode", () => {
	it("should reorder children inside a group", () => {
		const ruleA = createRuleNode();
		const ruleB = createRuleNode();
		const ruleC = createRuleNode();

		const group = createGroupNode();
		group.children = [ruleA, ruleB, ruleC];

		const result = reorderNode(group, group.id, 0, 2);

		expect(result.type).toBe("group");
		if (result.type !== "group") return;

		expect(result.children.map((child) => child.id)).toEqual([
			ruleB.id,
			ruleC.id,
			ruleA.id,
		]);
	});

	it("should not crash if indexes are invalid", () => {
		const ruleA = createRuleNode();

		const group = createGroupNode();
		group.children = [ruleA];

		const result = reorderNode(group, group.id, 0, 5);

		expect(result.type).toBe("group");
		if (result.type !== "group") return;
		expect(result.children.length).toBe(1);
	});

	it("should preserve structure for nested groups", () => {
		const ruleA = createRuleNode();
		const ruleB = createRuleNode();

		const nestedGroup = createGroupNode();
		nestedGroup.children = [ruleA, ruleB];

		const root = createGroupNode();
		root.children = [nestedGroup];

		const result = reorderNode(root, nestedGroup.id, 0, 1);

		expect(result.type).toBe("group");
		if (result.type !== "group") return;
		expect(result.children[0].type).toBe("group");

		const updatedNestedGroup = result.children[0];
		expect(updatedNestedGroup.type).toBe("group");
		if (updatedNestedGroup.type !== "group") return;
		expect(updatedNestedGroup.children[0].id).toBe(ruleB.id);
		expect(updatedNestedGroup.children[1].id).toBe(ruleA.id);
	});
});
