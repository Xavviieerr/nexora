import { GroupNode, Node, RuleNode } from "@/core/query/types";

export type MongoQuery =
	| Record<string, unknown>
	| {
			$and?: MongoQuery[];
			$or?: MongoQuery[];
	  };

function compileRule(node: RuleNode): MongoQuery {
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

function compileGroup(node: GroupNode): MongoQuery {
	if (node.children.length === 0) {
		return {};
	}

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

export function compileMongo(node: Node): MongoQuery {
	if (node.type === "rule") {
		return compileRule(node);
	}

	return compileGroup(node);
}
