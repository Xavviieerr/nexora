import { describe, it, expect } from "vitest";
import {
	createRuleNode,
	createGroupNode,
	createRootGroupNode,
} from "@/core/query/createNode";
import { validateTree } from "@/core/validator/validateTree";
import { defaultSchema, schemas } from "@/core/schema/schema";

describe("Advanced Validation Rules", () => {
	describe("Field validation", () => {
		it("should reject rules with undefined field", () => {
			const tree = createRootGroupNode();
			const rule = createRuleNode();
			rule.field = "nonexistent_field";
			tree.children.push(rule);

			const errors = validateTree(tree, defaultSchema);
			expect(errors.some((e) => e.message.includes("Unknown field"))).toBe(
				true,
			);
		});

		it("should reject rules with missing field", () => {
			const tree = createRootGroupNode();
			const rule = createRuleNode();
			rule.field = "";
			tree.children.push(rule);

			const errors = validateTree(tree, defaultSchema);
			expect(errors.some((e) => e.message.includes("Missing field"))).toBe(
				true,
			);
		});
	});

	describe("Operator validation", () => {
		it("should reject invalid operators for number fields", () => {
			const tree = createRootGroupNode();
			const rule = createRuleNode();
			rule.field = "age";
			rule.operator = "contains" as any;
			rule.value = "test";
			tree.children.push(rule);

			const errors = validateTree(tree, defaultSchema);
			expect(errors.some((e) => e.message.includes("Invalid operator"))).toBe(
				true,
			);
		});

		it("should accept valid operators for string fields", () => {
			const tree = createRootGroupNode();
			const rule = createRuleNode();
			rule.field = "name";
			rule.operator = "contains";
			rule.value = "John";
			tree.children.push(rule);

			const errors = validateTree(tree, defaultSchema);
			expect(errors.length).toBe(0);
		});
	});

	describe("Value validation", () => {
		it("should reject empty string values", () => {
			const tree = createRootGroupNode();
			const rule = createRuleNode();
			rule.field = "name";
			rule.operator = "eq";
			rule.value = "";
			tree.children.push(rule);

			const errors = validateTree(tree, defaultSchema);
			expect(errors.some((e) => e.message.includes("Missing value"))).toBe(
				true,
			);
		});

		it("should reject null values", () => {
			const tree = createRootGroupNode();
			const rule = createRuleNode();
			rule.field = "name";
			rule.operator = "eq";
			rule.value = null as any;
			tree.children.push(rule);

			const errors = validateTree(tree, defaultSchema);
			expect(errors.some((e) => e.message.includes("Missing value"))).toBe(
				true,
			);
		});

		it("should accept valid numeric values", () => {
			const tree = createRootGroupNode();
			const rule = createRuleNode();
			rule.field = "age";
			rule.operator = "gt";
			rule.value = 18;
			tree.children.push(rule);

			const errors = validateTree(tree, defaultSchema);
			expect(errors.length).toBe(0);
		});
	});

	describe("Between operator validation", () => {
		it("should reject between with incomplete values", () => {
			const tree = createRootGroupNode();
			const rule = createRuleNode();
			rule.field = "age";
			rule.operator = "between";
			rule.value = "18";
			tree.children.push(rule);

			const errors = validateTree(tree, defaultSchema);
			expect(
				errors.some((e) => e.message.includes("Between requires two values")),
			).toBe(true);
		});

		it("should accept between with array values", () => {
			const tree = createRootGroupNode();
			const rule = createRuleNode();
			rule.field = "age";
			rule.operator = "between";
			rule.value = [18, 65];
			tree.children.push(rule);

			const errors = validateTree(tree, defaultSchema);
			expect(errors.length).toBe(0);
		});

		it("should reject between with invalid numeric values", () => {
			const tree = createRootGroupNode();
			const rule = createRuleNode();
			rule.field = "age";
			rule.operator = "between";
			rule.value = ["18", "65"] as any;
			tree.children.push(rule);

			const errors = validateTree(tree, defaultSchema);
			expect(
				errors.some((e) => e.message.includes("Between values are invalid")),
			).toBe(true);
		});
	});

	describe("Regex operator validation", () => {
		it("should accept valid regex patterns", () => {
			const tree = createRootGroupNode();
			const rule = createRuleNode();
			rule.field = "name";
			rule.operator = "regex";
			rule.value = "^Ada";
			tree.children.push(rule);

			const errors = validateTree(tree, defaultSchema);
			expect(errors.length).toBe(0);
		});

		it("should reject invalid regex patterns", () => {
			const tree = createRootGroupNode();
			const rule = createRuleNode();
			rule.field = "name";
			rule.operator = "regex";
			rule.value = "([" as any;
			tree.children.push(rule);

			const errors = validateTree(tree, defaultSchema);
			expect(
				errors.some((e) => e.message.includes("Invalid regex pattern")),
			).toBe(true);
		});
	});

	describe("Null check validation", () => {
		it("should accept isNull without a value", () => {
			const tree = createRootGroupNode();
			const rule = createRuleNode();
			rule.field = "name";
			rule.operator = "isNull";
			rule.value = "";
			tree.children.push(rule);

			const errors = validateTree(tree, defaultSchema);
			expect(errors.length).toBe(0);
		});

		it("should accept isNotNull without a value", () => {
			const tree = createRootGroupNode();
			const rule = createRuleNode();
			rule.field = "name";
			rule.operator = "isNotNull";
			rule.value = "";
			tree.children.push(rule);

			const errors = validateTree(tree, defaultSchema);
			expect(errors.length).toBe(0);
		});
	});

	describe("In operator validation", () => {
		it("should reject empty in lists", () => {
			const tree = createRootGroupNode();
			const rule = createRuleNode();
			rule.field = "status";
			rule.operator = "in";
			rule.value = [];
			tree.children.push(rule);

			const errors = validateTree(tree, defaultSchema);
			expect(errors.some((e) => e.message.includes("non-empty array"))).toBe(
				true,
			);
		});

		it("should reject invalid enum values in in operator", () => {
			const tree = createRootGroupNode();
			const rule = createRuleNode();
			rule.field = "status";
			rule.operator = "in";
			rule.value = ["active", "paused"] as any;
			tree.children.push(rule);

			const errors = validateTree(tree, defaultSchema);
			expect(
				errors.some((e) => e.message.includes("In values are invalid")),
			).toBe(true);
		});
	});

	describe("Group validation", () => {
		it("should reject empty groups", () => {
			const tree = createRootGroupNode();
			const emptyGroup = createGroupNode();
			tree.children.push(emptyGroup);

			const errors = validateTree(tree, defaultSchema);
			expect(errors.some((e) => e.message.includes("cannot be empty"))).toBe(
				true,
			);
		});

		it("should accept groups with valid children", () => {
			const tree = createRootGroupNode();
			const group = createGroupNode();
			const rule = createRuleNode();
			rule.field = "age";
			rule.operator = "gt";
			rule.value = 18;
			group.children.push(rule);
			tree.children.push(group);

			const errors = validateTree(tree, defaultSchema);
			expect(errors.length).toBe(0);
		});

		it("should validate deeply nested structures", () => {
			const root = createRootGroupNode();
			const group1 = createGroupNode();
			const group2 = createGroupNode();
			const rule = createRuleNode();

			rule.field = "age";
			rule.operator = "gt";
			rule.value = 18;

			group2.children.push(rule);
			group1.children.push(group2);
			root.children.push(group1);

			const errors = validateTree(root, defaultSchema);
			expect(errors.length).toBe(0);
		});
	});

	describe("Schema-specific validation", () => {
		it("should validate enum fields correctly", () => {
			const tree = createRootGroupNode();
			const rule = createRuleNode();
			rule.field = "status";
			rule.operator = "eq";
			rule.value = "active";
			tree.children.push(rule);

			const errors = validateTree(tree, defaultSchema);
			expect(errors.length).toBe(0);
		});

		it("should reject non-eq operators on enum fields", () => {
			const tree = createRootGroupNode();
			const rule = createRuleNode();
			rule.field = "status";
			rule.operator = "contains" as any;
			rule.value = "active";
			tree.children.push(rule);

			const errors = validateTree(tree, defaultSchema);
			expect(errors.some((e) => e.message.includes("Invalid operator"))).toBe(
				true,
			);
		});

		it("should accept in operator on enum fields", () => {
			const tree = createRootGroupNode();
			const rule = createRuleNode();
			rule.field = "status";
			rule.operator = "in";
			rule.value = ["active", "inactive"];
			tree.children.push(rule);

			const errors = validateTree(tree, defaultSchema);
			expect(errors.length).toBe(0);
		});
	});
});
