import { Node } from "@/core/query/types";
import { Schema } from "@/core/schema/schema";
import { operatorMatrix } from "@/core/schema/operatorMatrix";

export function validateNode(node: Node, schema: Schema): string[] {
	if (node.type !== "rule") {
		return [];
	}

	const errors: string[] = [];

	if (!node.field) {
		errors.push("Missing field");
		return errors;
	}

	const field = schema.fields.find((f) => f.name === node.field);

	if (!field) {
		errors.push(`Unknown field: ${node.field}`);

		return errors;
	}

	const allowedOperators = operatorMatrix[field.type];

	if (!allowedOperators.includes(node.operator)) {
		errors.push(`Invalid operator ${node.operator} for ${field.name}`);
	}

	if (node.value === "" || node.value === null) {
		errors.push("Missing value");
	}

	return errors;
}
