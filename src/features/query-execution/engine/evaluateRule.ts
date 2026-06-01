import { RuleNode } from "@/core/query/types";
import { QueryRecord } from "../types";

export function evaluateRule(rule: RuleNode, record: QueryRecord): boolean {
	const value = record[rule.field];

	switch (rule.operator) {
		case "eq":
			return value === rule.value;

		case "gt":
			if (value === null) return false;
			return Number(value) > Number(rule.value);

		case "lt":
			if (value === null) return false;
			return Number(value) < Number(rule.value);

		case "contains":
			return String(value)
				.toLowerCase()
				.includes(String(rule.value).toLowerCase());

		case "startsWith":
			return String(value)
				.toLowerCase()
				.startsWith(String(rule.value).toLowerCase());

		case "neq":
			return value !== rule.value;

		default:
			return false;
	}
}
