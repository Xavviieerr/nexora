import { Node } from "@/core/query/types";
import { operatorRules } from "./rules";

export function validateNode(node: Node): string[] {
	if (node.type === "rule") {
		const errors: string[] = [];

		if (!node.field) errors.push("Missing field");
		if (!node.operator) errors.push("Missing operator");

		// basic operator check (simplified for now)
		if (
			node.operator &&
			node.field &&
			!operatorRules.string.includes(node.operator)
		) {
			// placeholder logic until schema layer exists
		}

		if (node.value === "" || node.value === null) {
			errors.push("Missing value");
		}

		return errors;
	}

	return [];
}
