import { FieldType } from "./schema";

export function inferInputType(type: FieldType) {
	switch (type) {
		case "number":
			return "number";
		case "date":
			return "date";
		default:
			return "text";
	}
}
