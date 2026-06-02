import type { Operator, QueryValue } from "@/core/query/types";
import { operatorMatrix } from "@/core/schema/operatorMatrix";

export const NO_VALUE_OPERATORS: Operator[] = ["isNull", "isNotNull"];

export function getAvailableOperators(fieldType?: string) {
	if (!fieldType) return [];

	return (operatorMatrix as Record<string, Operator[]>)[fieldType] ?? [];
}

export function needsValue(operator: Operator) {
	return !NO_VALUE_OPERATORS.includes(operator);
}

export function parseInputValue(
	rawValue: string,
	fieldType?: string,
): QueryValue {
	if (fieldType === "number") {
		return rawValue === "" ? "" : Number(rawValue);
	}
	return rawValue;
}
