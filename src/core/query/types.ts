export type Operator =
	| "eq"
	| "neq"
	| "contains"
	| "startsWith"
	| "regex"
	| "gt"
	| "lt"
	| "in"
	| "between"
	| "isNull"
	| "isNotNull";

export type Logic = "AND" | "OR";

export type QueryValue = string | number | boolean | Date | string[] | number[];

export type RuleNode = {
	id: string;
	type: "rule";
	field: string;
	operator: Operator;
	value: QueryValue;
};

export type GroupNode = {
	id: string;
	type: "group";
	logic: Logic;
	children: Node[];
};

export type Node = RuleNode | GroupNode;
