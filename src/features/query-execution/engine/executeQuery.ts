import { Node, GroupNode } from "@/core/query/types";
import { evaluateGroup } from "./evaluateGroup";
import { QueryRecord } from "../types";

export function executeQuery(tree: Node, data: QueryRecord[]): QueryRecord[] {
	if (tree.type !== "group") return data;
	return data.filter((record) => evaluateGroup(tree as GroupNode, record));
}
