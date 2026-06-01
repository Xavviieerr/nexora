import { Node } from "@/core/query/types";
import { Schema } from "@/core/schema/schema";
import { validateNode } from "./validateNode";
import { ValidationError } from "./types";

export function validateTree(node: Node, schema: Schema): ValidationError[] {
	let errors: ValidationError[] = [];

	errors = errors.concat(validateNode(node, schema));

	if (node.type === "group") {
		if (!Array.isArray(node.children) || node.children.length === 0) {
			errors.push({
				nodeId: node.id,
				message: "Group cannot be empty",
			});
		}

		if (node.logic !== "AND" && node.logic !== "OR") {
			errors.push({
				nodeId: node.id,
				message: "Group logic must be AND or OR",
			});
		}

		node.children.forEach((child) => {
			errors = errors.concat(validateTree(child, schema));
		});
	}

	return errors;
}
