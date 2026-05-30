export type FieldType = "string" | "number" | "date" | "enum";

export type SchemaField = {
	name: string;
	type: FieldType;
	options?: string[];
};

export type Schema = {
	fields: SchemaField[];
};

export const defaultSchema: Schema = {
	fields: [
		{ name: "name", type: "string" },
		{ name: "age", type: "number" },
		{ name: "status", type: "enum", options: ["active", "inactive"] },
		{ name: "createdAt", type: "date" },
	],
};

// helpers (IMPORTANT for UI later)
export function getField(schema: Schema, name: string) {
	return schema.fields.find((f) => f.name === name);
}
