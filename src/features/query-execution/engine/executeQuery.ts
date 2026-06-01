import { Node } from "@/core/query/types";

function parseValue(value: any) {
	if (Array.isArray(value)) return value;
	if (typeof value === "string" && value.includes(",")) {
		return value.split(",").map((v) => v.trim());
	}
	return value;
}

function betweenMatch(value: any, min: any, max: any) {
	const num = Number(value);
	return num >= Number(min) && num <= Number(max);
}

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

					case "neq":
						return value !== child.value;

					case "gt":
						return value > child.value;

					case "lt":
						return value < child.value;

					case "contains":
						return String(value).includes(String(child.value));

					case "startsWith":
						return String(value).startsWith(String(child.value));

					case "in": {
						const list = parseValue(child.value);
						return Array.isArray(list) ? list.includes(value) : false;
					}

					case "between": {
						const [min, max] = parseValue(child.value);
						return betweenMatch(value, min, max);
					}

					default:
						return true;
				}
			});
		}
	}

	return result;
}
