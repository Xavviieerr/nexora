import { Node } from "@/core/query/types";

export function compileToMongo(node: Node): any {
	if (node.type === "rule") {
		switch (node.operator) {
			case "eq":
				return { [node.field]: node.value };

			case "gt":
				return { [node.field]: { $gt: node.value } };

			case "lt":
				return { [node.field]: { $lt: node.value } };

			case "contains":
				return {
					[node.field]: {
						$regex: node.value,
						$options: "i",
					},
				};

			case "startsWith":
				return {
					[node.field]: {
						$regex: `^${node.value}`,
						$options: "i",
					},
				};

			default:
				return {};
		}
	}

	const children = node.children.map(compileToMongo);

	if (node.logic === "AND") {
		return { $and: children };
	}

	return { $or: children };
}
