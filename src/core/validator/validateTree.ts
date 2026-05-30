import { Node } from "@/core/query/types";
import { Schema } from "@/core/schema/schema";
import { validateNode } from "./validateNode";

export function validateTree(node: Node, schema: Schema): string[] {
	let errors: string[] = [];

	errors = errors.concat(validateNode(node, schema));

	if (node.type === "group") {
		if (node.children.length === 0) {
			errors.push(`Group ${node.id} cannot be empty`);
		}

		node.children.forEach((child) => {
			errors = errors.concat(validateTree(child, schema));
		});
	}

	return errors;
}
