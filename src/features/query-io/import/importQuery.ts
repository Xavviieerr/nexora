import { Node } from "@/core/query/types";

export function importQuery(json: string): Node {
	return JSON.parse(json);
}
