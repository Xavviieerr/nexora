import { Node } from "@/core/query/types";
import { Schema } from "@/core/schema/schema";
import { validateNode } from "./validateNode";

export function validateTree(node: Node, schema: Schema): string[] {
	let errors: string[] = [];

	errors = errors.concat(validateNode(node, schema));

	if (node.type === "group") {
		node.children.forEach((child) => {
			errors = errors.concat(validateTree(child, schema));
		});
	}

	return errors;
}
