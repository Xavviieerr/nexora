import { Logic, Node, Operator, QueryValue } from "./types";

const operators: Operator[] = [
	"eq",
	"neq",
	"contains",
	"startsWith",
	"regex",
	"gt",
	"lt",
	"in",
	"between",
	"isNull",
	"isNotNull",
];

const logicValues: Logic[] = ["AND", "OR"];

function isQueryValue(value: unknown): value is QueryValue {
	if (
		typeof value === "string" ||
		typeof value === "number" ||
		typeof value === "boolean"
	) {
		return true;
	}

	if (Array.isArray(value)) {
		return value.every(
			(item) => typeof item === "string" || typeof item === "number",
		);
	}

	return false;
}

export function isValidNode(value: unknown): value is Node {
	if (!value || typeof value !== "object") {
		return false;
	}

	const node = value as Record<string, unknown>;

	if (typeof node.id !== "string" || typeof node.type !== "string") {
		return false;
	}

	if (node.type === "rule") {
		return (
			typeof node.field === "string" &&
			typeof node.operator === "string" &&
			operators.includes(node.operator as Operator) &&
			isQueryValue(node.value)
		);
	}

	if (node.type === "group") {
		if (
			typeof node.logic !== "string" ||
			!logicValues.includes(node.logic as Logic) ||
			!Array.isArray(node.children)
		) {
			return false;
		}

		return node.children.every((child) => isValidNode(child));
	}

	return false;
}
