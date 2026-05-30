import { FieldType } from "./schema";

export const operatorMatrix: Record<FieldType, string[]> = {
	string: ["eq", "contains", "startsWith"],
	number: ["eq", "gt", "lt"],
	date: ["eq", "gt", "lt"],
	enum: ["eq"],
};
