import { FieldType } from "./schema";
import { Operator } from "@/core/query/types";

export const operatorMatrix: Record<FieldType, Operator[]> = {
	string: ["eq", "neq", "contains", "startsWith", "in"],
	number: ["eq", "neq", "gt", "lt", "in", "between"],
	date: ["eq", "neq", "gt", "lt", "between"],
	enum: ["eq", "neq", "in"],
};
