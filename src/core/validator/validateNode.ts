import { Node } from "@/core/query/types";
import { operatorMatrix } from "@/core/schema/operatorMatrix";
import { Schema } from "@/core/schema/schema";

export function validateNode(node: Node, schema?: Schema): string[] {
	if (node.type !== "rule") return [];

	const errors: string[] = [];

	if (!node.field) {
		errors.push("Missing field");
		return errors;
	}

	if (!node.operator) {
		errors.push("Missing operator");
		return errors;
	}

	const fieldDef = schema?.fields.find((f) => f.name === node.field);

	if (!fieldDef) {
		errors.push(`Field "${node.field}" not found in schema`);
		return errors;
	}

	const allowedOperators = operatorMatrix[fieldDef.type];

	if (!allowedOperators.includes(node.operator)) {
		errors.push(
			`Operator "${node.operator}" not allowed for type "${fieldDef.type}"`,
		);
	}

	if (node.value === "" || node.value === null || node.value === undefined) {
		errors.push("Missing value");
	}

	return errors;
}
