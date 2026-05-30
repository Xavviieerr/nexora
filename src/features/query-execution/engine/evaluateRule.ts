import { RuleNode } from "@/core/query/types";

export function evaluateRule(
	rule: RuleNode,
	record: Record<string, any>,
): boolean {
	const value = record[rule.field];

	switch (rule.operator) {
		case "eq":
			return value === rule.value;

		case "gt":
			return value > Number(rule.value);

		case "lt":
			return value < Number(rule.value);

		case "contains":
			return String(value)
				.toLowerCase()
				.includes(String(rule.value).toLowerCase());

		case "startsWith":
			return String(value)
				.toLowerCase()
				.startsWith(String(rule.value).toLowerCase());

		default:
			return false;
	}
}
