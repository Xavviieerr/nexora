import type { Logic } from "@/core/query/types";

export function getNextLogic(current: Logic): Logic {
	return current === "AND" ? "OR" : "AND";
}

export function getChildrenLabel(count: number) {
	return `${count} condition${count !== 1 ? "s" : ""}`;
}
