import { describe, expect, it } from "vitest";
import { executeQuery } from "./executeQuery";
import { GroupNode } from "@/core/query/types";
import { QueryRecord } from "../types";

const data: QueryRecord[] = [
	{ name: "Ada", age: 25, status: "active" },
	{ name: "Tunde", age: 16, status: "inactive" },
	{ name: "Chioma", age: 32, status: "active" },
];

describe("executeQuery", () => {
	it("evaluates nested groups with OR logic", () => {
		const tree: GroupNode = {
			id: "root",
			type: "group",
			logic: "AND",
			children: [
				{
					id: "status",
					type: "rule",
					field: "status",
					operator: "eq",
					value: "active",
				},
				{
					id: "age-or-name",
					type: "group",
					logic: "OR",
					children: [
						{
							id: "age",
							type: "rule",
							field: "age",
							operator: "lt",
							value: 30,
						},
						{
							id: "name",
							type: "rule",
							field: "name",
							operator: "startsWith",
							value: "Chi",
						},
					],
				},
			],
		};

		expect(executeQuery(tree, data).map((record) => record.name)).toEqual([
			"Ada",
			"Chioma",
		]);
	});

	it("matches contains and startsWith case-insensitively", () => {
		const tree: GroupNode = {
			id: "root",
			type: "group",
			logic: "OR",
			children: [
				{
					id: "contains",
					type: "rule",
					field: "name",
					operator: "contains",
					value: "UND",
				},
				{
					id: "starts",
					type: "rule",
					field: "name",
					operator: "startsWith",
					value: "ada",
				},
			],
		};

		expect(executeQuery(tree, data).map((record) => record.name)).toEqual([
			"Ada",
			"Tunde",
		]);
	});

	it("matches regex patterns and null checks", () => {
		const tree: GroupNode = {
			id: "root",
			type: "group",
			logic: "AND",
			children: [
				{
					id: "regex",
					type: "rule",
					field: "name",
					operator: "regex",
					value: "^A",
				},
				{
					id: "notnull",
					type: "rule",
					field: "status",
					operator: "isNotNull",
					value: "",
				},
			],
		};

		expect(executeQuery(tree, data).map((record) => record.name)).toEqual([
			"Ada",
		]);
	});
});
