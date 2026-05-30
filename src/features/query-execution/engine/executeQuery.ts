import { Node } from "@/core/query/types";

export function executeQuery(tree: Node, data: any[]): any[] {
	if (tree.type !== "group") return data;

	let result = [...data];

	for (const child of tree.children) {
		if (child.type === "rule") {
			result = result.filter((item) => {
				const value = item[child.field];

				switch (child.operator) {
					case "eq":
						return value === child.value;

					case "gt":
						return value > child.value;

					case "lt":
						return value < child.value;

					case "contains":
						return String(value).includes(String(child.value));

					default:
						return true;
				}
			});
		}
	}

	return result;
}
