import { FieldType } from "./schema";
import { Operator } from "@/core/query/types";

export const operatorMatrix: Record<FieldType, Operator[]> = {
	string: ["eq", "contains", "startsWith"],
	number: ["eq", "gt", "lt"],
	date: ["eq", "gt", "lt"],
	enum: ["eq"],
};
