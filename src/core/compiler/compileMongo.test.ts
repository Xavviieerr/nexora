import { describe, it, expect } from "vitest";
import { compileMongo } from "./compileMongo";
import { createGroupNode } from "../query/createNode";

describe("compileMongo", () => {
	it("compiles simple AND query", () => {
		const tree = createGroupNode();

		tree.children.push({
			id: "1",
			type: "rule",
			field: "age",
			operator: "gt",
			value: 18,
		});

		tree.children.push({
			id: "2",
			type: "rule",
			field: "status",
			operator: "eq",
			value: "active",
		});

		const result = compileMongo(tree);

		expect(result).toEqual({
			$and: [{ age: { $gt: 18 } }, { status: "active" }],
		});
	});
});
