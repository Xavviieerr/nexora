export type FieldType = "string" | "number" | "date" | "enum";

export type SchemaField = {
	name: string;
	type: FieldType;
	options?: string[];
};

export type Schema = {
	id: string;
	label: string;
	fields: SchemaField[];
};

export const schemas: Schema[] = [
	{
		id: "users",
		label: "Users",
		fields: [
			{ name: "name", type: "string" },
			{ name: "age", type: "number" },
			{ name: "status", type: "enum", options: ["active", "inactive"] },
			{ name: "country", type: "enum", options: ["Nigeria", "Ghana", "Kenya"] },
			{ name: "purchases", type: "number" },
			{ name: "createdAt", type: "date" },
		],
	},
	{
		id: "orders",
		label: "Orders",
		fields: [
			{ name: "orderId", type: "string" },
			{ name: "total", type: "number" },
			{ name: "status", type: "enum", options: ["paid", "pending", "failed"] },
			{ name: "region", type: "enum", options: ["West", "East", "North"] },
			{ name: "createdAt", type: "date" },
		],
	},
	{
		id: "products",
		label: "Products",
		fields: [
			{ name: "name", type: "string" },
			{ name: "category", type: "enum", options: ["SaaS", "Hardware", "Service"] },
			{ name: "price", type: "number" },
			{ name: "stock", type: "number" },
			{ name: "releasedAt", type: "date" },
		],
	},
];

export const defaultSchema = schemas[0];

// helpers (IMPORTANT for UI later)
export function getField(schema: Schema, name: string) {
	return schema.fields.find((f) => f.name === name);
}
