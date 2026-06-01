import { Node, GroupNode, RuleNode } from "@/core/query/types";

function compileRule(node: RuleNode): string {
	if (!node.field) return "";

	const field = node.field;
	const value = typeof node.value === "string" ? `'${node.value}'` : node.value;

	switch (node.operator) {
		case "eq":
			return `${field} = ${value}`;

		case "neq":
			return `${field} != ${value}`;

		case "gt":
			return `${field} > ${value}`;

		case "lt":
			return `${field} < ${value}`;

		case "contains":
			return `${field} LIKE '%${node.value}%'`;

		case "startsWith":
			return `${field} LIKE '${node.value}%'`;

		case "in":
			return `${field} IN (${
				Array.isArray(node.value)
					? node.value.map((v) => `'${v}'`).join(", ")
					: `'${node.value}'`
			})`;

		case "between": {
			const [min, max] = Array.isArray(node.value)
				? node.value
				: String(node.value)
						.split(",")
						.map((v) => v.trim());

			return `${field} BETWEEN ${min} AND ${max}`;
		}

		default:
			return "";
	}
}

function compileGroup(node: GroupNode): string {
	const children = node.children.map(compileSQL).filter(Boolean);

	if (children.length === 0) return "";

	const joiner = node.logic === "AND" ? " AND " : " OR ";

	return `(${children.join(joiner)})`;
}

export function compileSQL(node: Node): string {
	if (node.type === "rule") {
		return compileRule(node);
	}

	return compileGroup(node);
}
