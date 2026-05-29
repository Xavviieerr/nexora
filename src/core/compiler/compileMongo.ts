import { GroupNode, Node, RuleNode } from "@/core/query/types";

function compileRule(node: RuleNode) {
	switch (node.operator) {
		case "eq":
			return {
				[node.field]: node.value,
			};

		case "gt":
			return {
				[node.field]: {
					$gt: node.value,
				},
			};

		case "lt":
			return {
				[node.field]: {
					$lt: node.value,
				},
			};

		case "contains":
			return {
				[node.field]: {
					$regex: node.value,
					$options: "i",
				},
			};

		default:
			return {};
	}
}

function compileGroup(node: GroupNode) {
	const compiledChildren = node.children.map(compileMongo);

	if (node.logic === "AND") {
		return {
			$and: compiledChildren,
		};
	}

	return {
		$or: compiledChildren,
	};
}

export function compileMongo(node: Node): unknown {
	if (node.type === "rule") {
		return compileRule(node);
	}

	return compileGroup(node);
}
