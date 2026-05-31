import { Node } from "@/core/query/types";
import { Schema } from "@/core/schema/schema";
import { operatorMatrix } from "@/core/schema/operatorMatrix";
import { ValidationError } from "./types";

export function validateNode(node: Node, schema: Schema): ValidationError[] {
	if (node.type !== "rule") {
		return [];
	}

	const errors: ValidationError[] = [];

	if (!node.field) {
		errors.push({
			nodeId: node.id,
			message: "Missing field",
		});
		return errors;
	}

	const field = schema.fields.find((f) => f.name === node.field);

	if (!field) {
		errors.push({
			nodeId: node.id,
			message: `Unknown field: ${node.field}`,
		});
		return errors;
	}

	const allowedOperators = operatorMatrix[field.type];

	if (!allowedOperators.includes(node.operator)) {
		errors.push({
			nodeId: node.id,
			message: `Invalid operator ${node.operator} for ${node.field}`,
		});
	}

	if (node.value === "" || node.value === null) {
		errors.push({
			nodeId: node.id,
			message: "Missing value",
		});
	}

	return errors;
}
