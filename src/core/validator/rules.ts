export const operatorRules = {
	number: ["eq", "gt", "lt"],
	string: ["eq", "contains", "startsWith"],
	date: ["eq", "gt", "lt"],
	enum: ["eq"],
};
