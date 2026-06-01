import { Node } from "@/core/query/types";
import { evaluateGroup } from "./evaluateGroup";
import { evaluateRule } from "./evaluateRule";
import { QueryRecord } from "../types";

export function executeQuery<TRecord extends QueryRecord>(
	tree: Node,
	data: TRecord[],
): TRecord[] {
	return data.filter((record) =>
		tree.type === "group"
			? evaluateGroup(tree, record)
			: evaluateRule(tree, record),
	);
}
