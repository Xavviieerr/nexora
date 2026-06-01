import { FieldType } from "./schema";
import { Operator } from "@/core/query/types";

export const operatorMatrix: Record<FieldType, Operator[]> = {
	string: [
		"eq",
		"neq",
		"contains",
		"startsWith",
		"regex",
		"in",
		"isNull",
		"isNotNull",
	],
	number: ["eq", "neq", "gt", "lt", "in", "between", "isNull", "isNotNull"],
	date: ["eq", "neq", "gt", "lt", "between", "isNull", "isNotNull"],
	enum: ["eq", "neq", "in", "isNull", "isNotNull"],
};
