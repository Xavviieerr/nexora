import { describe, it, expect } from "vitest";
import { compileMongo } from "@/core/compiler/compileMongo";
import { compileSQL } from "@/core/compiler/conpileSQL";
import {
	createGroupNode,
	createRuleNode,
	createRootGroupNode,
} from "@/core/query/createNode";

describe("Query Compilation Engines", () => {
	describe("MongoDB Compilation", () => {
		it("should compile simple equality rule", () => {
			const group = createRootGroupNode();
			const rule = createRuleNode();
			rule.field = "age";
			rule.operator = "eq";
			rule.value = 25;
			group.children.push(rule);

			const result = compileMongo(group);

			expect(result).toHaveProperty("$and");
		});

		it("should compile greater than operator", () => {
			const group = createRootGroupNode();
			const rule = createRuleNode();
			rule.field = "age";
			rule.operator = "gt";
			rule.value = 18;
			group.children.push(rule);

			const result = compileMongo(group);

			expect(JSON.stringify(result)).toContain("$gt");
		});

		it("should compile less than operator", () => {
			const group = createRootGroupNode();
			const rule = createRuleNode();
			rule.field = "price";
			rule.operator = "lt";
			rule.value = 100;
			group.children.push(rule);

			const result = compileMongo(group);

			expect(JSON.stringify(result)).toContain("$lt");
		});

		it("should compile contains with regex", () => {
			const group = createRootGroupNode();
			const rule = createRuleNode();
			rule.field = "name";
			rule.operator = "contains";
			rule.value = "John";
			group.children.push(rule);

			const result = compileMongo(group);

			expect(JSON.stringify(result)).toContain("$regex");
		});

		it("should compile startsWith with regex", () => {
			const group = createRootGroupNode();
			const rule = createRuleNode();
			rule.field = "name";
			rule.operator = "startsWith";
			rule.value = "J";
			group.children.push(rule);

			const result = compileMongo(group);

			expect(JSON.stringify(result)).toContain("$regex");
			expect(JSON.stringify(result)).toContain("^J");
		});

		it("should compile regex operator", () => {
			const group = createRootGroupNode();
			const rule = createRuleNode();
			rule.field = "name";
			rule.operator = "regex" as any;
			rule.value = "^Ada";
			group.children.push(rule);

			const result = compileMongo(group);

			expect(JSON.stringify(result)).toContain("$regex");
			expect(JSON.stringify(result)).toContain("^Ada");
		});

		it("should compile isNull operator", () => {
			const group = createRootGroupNode();
			const rule = createRuleNode();
			rule.field = "name";
			rule.operator = "isNull" as any;
			rule.value = "";
			group.children.push(rule);

			const result = compileMongo(group);

			expect(JSON.stringify(result)).toContain("null");
		});

		it("should compile isNotNull operator", () => {
			const group = createRootGroupNode();
			const rule = createRuleNode();
			rule.field = "name";
			rule.operator = "isNotNull" as any;
			rule.value = "";
			group.children.push(rule);

			const result = compileMongo(group);

			expect(JSON.stringify(result)).toContain("$ne");
		});

		it("should compile in operator", () => {
			const group = createRootGroupNode();
			const rule = createRuleNode();
			rule.field = "status";
			rule.operator = "in";
			rule.value = ["active", "pending"];
			group.children.push(rule);

			const result = compileMongo(group);

			expect(JSON.stringify(result)).toContain("$in");
		});

		it("should compile between operator", () => {
			const group = createRootGroupNode();
			const rule = createRuleNode();
			rule.field = "age";
			rule.operator = "between";
			rule.value = [18, 65];
			group.children.push(rule);

			const result = compileMongo(group);

			expect(JSON.stringify(result)).toContain("$gte");
			expect(JSON.stringify(result)).toContain("$lte");
		});

		it("should compile AND groups", () => {
			const group = createRootGroupNode();
			group.logic = "AND";

			const rule1 = createRuleNode();
			rule1.field = "age";
			rule1.operator = "gt";
			rule1.value = 18;

			const rule2 = createRuleNode();
			rule2.field = "status";
			rule2.operator = "eq";
			rule2.value = "active";

			group.children.push(rule1, rule2);

			const result = compileMongo(group);

			expect(result).toHaveProperty("$and");
		});

		it("should compile OR groups", () => {
			const group = createRootGroupNode();
			group.logic = "OR";

			const rule1 = createRuleNode();
			rule1.field = "age";
			rule1.operator = "gt";
			rule1.value = 18;

			const rule2 = createRuleNode();
			rule2.field = "status";
			rule2.operator = "eq";
			rule2.value = "inactive";

			group.children.push(rule1, rule2);

			const result = compileMongo(group);

			expect(result).toHaveProperty("$or");
		});

		it("should compile nested groups", () => {
			const root = createRootGroupNode();
			const nestedGroup = createGroupNode();
			nestedGroup.logic = "OR";

			const rule1 = createRuleNode();
			rule1.field = "age";
			rule1.operator = "gt";
			rule1.value = 18;

			const rule2 = createRuleNode();
			rule2.field = "age";
			rule2.operator = "lt";
			rule2.value = 65;

			nestedGroup.children.push(rule1, rule2);
			root.children.push(nestedGroup);

			const result = compileMongo(root);

			expect(JSON.stringify(result)).toContain("$or");
		});
	});

	describe("SQL Compilation", () => {
		it("should compile simple equality rule to SQL", () => {
			const group = createRootGroupNode();
			const rule = createRuleNode();
			rule.field = "age";
			rule.operator = "eq";
			rule.value = 25;
			group.children.push(rule);

			const result = compileSQL(group);

			expect(result).toContain("age = 25");
		});

		it("should compile greater than to SQL", () => {
			const group = createRootGroupNode();
			const rule = createRuleNode();
			rule.field = "age";
			rule.operator = "gt";
			rule.value = 18;
			group.children.push(rule);

			const result = compileSQL(group);

			expect(result).toContain("age > 18");
		});

		it("should compile less than to SQL", () => {
			const group = createRootGroupNode();
			const rule = createRuleNode();
			rule.field = "price";
			rule.operator = "lt";
			rule.value = 100;
			group.children.push(rule);

			const result = compileSQL(group);

			expect(result).toContain("price < 100");
		});

		it("should compile contains to LIKE SQL", () => {
			const group = createRootGroupNode();
			const rule = createRuleNode();
			rule.field = "name";
			rule.operator = "contains";
			rule.value = "John";
			group.children.push(rule);

			const result = compileSQL(group);

			expect(result).toContain("LIKE");
			expect(result).toContain("%John%");
		});

		it("should compile startsWith to LIKE SQL", () => {
			const group = createRootGroupNode();
			const rule = createRuleNode();
			rule.field = "name";
			rule.operator = "startsWith";
			rule.value = "J";
			group.children.push(rule);

			const result = compileSQL(group);

			expect(result).toContain("LIKE");
			expect(result).toContain("J%");
		});

		it("should compile regex operator to SQL", () => {
			const group = createRootGroupNode();
			const rule = createRuleNode();
			rule.field = "name";
			rule.operator = "regex" as any;
			rule.value = "^Ada";
			group.children.push(rule);

			const result = compileSQL(group);

			expect(result).toContain("REGEXP");
			expect(result).toContain("^Ada");
		});

		it("should compile isNull operator to SQL", () => {
			const group = createRootGroupNode();
			const rule = createRuleNode();
			rule.field = "name";
			rule.operator = "isNull" as any;
			rule.value = "";
			group.children.push(rule);

			const result = compileSQL(group);

			expect(result).toContain("IS NULL");
		});

		it("should compile isNotNull operator to SQL", () => {
			const group = createRootGroupNode();
			const rule = createRuleNode();
			rule.field = "name";
			rule.operator = "isNotNull" as any;
			rule.value = "";
			group.children.push(rule);

			const result = compileSQL(group);

			expect(result).toContain("IS NOT NULL");
		});

		it("should compile IN operator to SQL", () => {
			const group = createRootGroupNode();
			const rule = createRuleNode();
			rule.field = "status";
			rule.operator = "in";
			rule.value = ["active", "pending"];
			group.children.push(rule);

			const result = compileSQL(group);

			expect(result).toContain("IN");
		});

		it("should compile BETWEEN operator to SQL", () => {
			const group = createRootGroupNode();
			const rule = createRuleNode();
			rule.field = "age";
			rule.operator = "between";
			rule.value = [18, 65];
			group.children.push(rule);

			const result = compileSQL(group);

			expect(result).toContain("BETWEEN");
		});

		it("should compile AND conditions with parentheses", () => {
			const group = createRootGroupNode();
			group.logic = "AND";

			const rule1 = createRuleNode();
			rule1.field = "age";
			rule1.operator = "gt";
			rule1.value = 18;

			const rule2 = createRuleNode();
			rule2.field = "status";
			rule2.operator = "eq";
			rule2.value = "active";

			group.children.push(rule1, rule2);

			const result = compileSQL(group);

			expect(result).toContain("AND");
			expect(result).toContain("(");
			expect(result).toContain(")");
		});

		it("should compile OR conditions with parentheses", () => {
			const group = createRootGroupNode();
			group.logic = "OR";

			const rule1 = createRuleNode();
			rule1.field = "age";
			rule1.operator = "gt";
			rule1.value = 18;

			const rule2 = createRuleNode();
			rule2.field = "status";
			rule2.operator = "eq";
			rule2.value = "inactive";

			group.children.push(rule1, rule2);

			const result = compileSQL(group);

			expect(result).toContain("OR");
			expect(result).toContain("(");
			expect(result).toContain(")");
		});
	});
});
