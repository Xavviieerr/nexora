import { describe, it, expect } from "vitest";
import { validateTree } from "./validateTree";
import { createGroupNode } from "../query/createNode";
import { defaultSchema } from "../schema/schema";

describe("validateTree", () => {
	it("detects empty group", () => {
		const tree = createGroupNode();

		const errors = validateTree(tree, defaultSchema);

		expect(errors.length).toBeGreaterThan(0);
	});

	it("passes valid rule", () => {
		const tree = createGroupNode();

		tree.children.push({
			id: "1",
			type: "rule",
			field: "age",
			operator: "gt",
			value: 18,
		});

		const errors = validateTree(tree, defaultSchema);

		expect(errors.length).toBe(0);
	});
});
