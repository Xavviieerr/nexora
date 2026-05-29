import { Node } from "@/core/query/types";
import { validateNode } from "./validateNode";

export function validateTree(node: Node): string[] {
	let errors: string[] = [];

	errors = errors.concat(validateNode(node));

	if (node.type === "group") {
		node.children.forEach((child) => {
			errors = errors.concat(validateTree(child));
		});
	}

	return errors;
}
