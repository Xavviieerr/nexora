import { describe, it, expect } from "vitest";
import { validateTree } from "@/core/validator/validateTree";
import { defaultSchema } from "@/core/schema/schema";

describe("Validation Engine", () => {
	it("rejects empty rule value", () => {
		const tree = {
			id: "root",
			type: "group",
			logic: "AND",
			children: [
				{
					id: "r1",
					type: "rule",
					field: "age",
					operator: "gt",
					value: "",
				},
			],
		};

		const errors = validateTree(tree as any, defaultSchema);

		expect(errors.length).toBeGreaterThan(0);
	});

	it("validates correct tree", () => {
		const tree = {
			id: "root",
			type: "group",
			logic: "AND",
			children: [
				{
					id: "r1",
					type: "rule",
					field: "age",
					operator: "gt",
					value: 18,
				},
			],
		};

		const errors = validateTree(tree as any, defaultSchema);

		expect(errors.length).toBe(0);
	});
});
