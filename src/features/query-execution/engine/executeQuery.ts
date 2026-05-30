import { Node } from "@/core/query/types";
import { evaluateRule } from "./evaluateRule";
import { evaluateGroup } from "./evaluateGroup";

export function executeQuery(tree: Node, dataset: Record<string, any>[]) {
	return dataset.filter((record) => {
		if (tree.type === "rule") {
			return evaluateRule(tree, record);
		}

		return evaluateGroup(tree, record);
	});
}
