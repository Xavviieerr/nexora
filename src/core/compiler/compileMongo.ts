import { GroupNode, Node, RuleNode } from "@/core/query/types";

export type MongoQuery =
	| Record<string, unknown>
	| {
			$and?: MongoQuery[];
			$or?: MongoQuery[];
	  };

function compileRule(node: RuleNode): MongoQuery {
	if (!node.field) return {};
	switch (node.operator) {
		case "eq":
			return {
				[node.field]: node.value,
			};

		case "neq":
			return {
				[node.field]: {
					$ne: node.value,
				},
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

		case "regex":
			return {
				[node.field]: {
					$regex: node.value,
					$options: "i",
				},
			};

		case "isNull":
			return {
				[node.field]: null,
			};

		case "isNotNull":
			return {
				[node.field]: {
					$ne: null,
				},
			};

		case "in":
			return {
				[node.field]: {
					$in: Array.isArray(node.value)
						? node.value
						: String(node.value)
								.split(",")
								.map((v) => v.trim()),
				},
			};

		case "between": {
			const [min, max] = Array.isArray(node.value)
				? node.value
				: String(node.value)
						.split(",")
						.map((v) => Number(v.trim()));

			return {
				[node.field]: {
					$gte: min,
					$lte: max,
				},
			};
		}

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
