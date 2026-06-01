import { RuleNode } from "@/core/query/types";
import { QueryRecord } from "../types";

function toList(val: unknown): string[] {
	if (Array.isArray(val)) return val.map(String);
	if (typeof val === "string" && val.includes(","))
		return val.split(",").map((v) => v.trim());
	return [String(val)];
}

export function evaluateRule(rule: RuleNode, record: QueryRecord): boolean {
	const value = record[rule.field];

	switch (rule.operator) {
		case "eq":
			// loose comparison to handle "18" === 18 across string inputs
			// eslint-disable-next-line eqeqeq
			return value == rule.value;

		case "neq":
			// eslint-disable-next-line eqeqeq
			return value != rule.value;

		case "gt":
			if (value === null || value === undefined) return false;
			return Number(value) > Number(rule.value);

		case "lt":
			if (value === null || value === undefined) return false;
			return Number(value) < Number(rule.value);

		case "contains":
			return String(value)
				.toLowerCase()
				.includes(String(rule.value).toLowerCase());

		case "startsWith":
			return String(value)
				.toLowerCase()
				.startsWith(String(rule.value).toLowerCase());

		case "in": {
			const list = toList(rule.value);
			return list.includes(String(value));
		}

		case "between": {
			const parts = toList(rule.value);
			if (parts.length < 2) return false;
			const num = Number(value);
			return num >= Number(parts[0]) && num <= Number(parts[1]);
		}

		default:
			return false;
	}
}
