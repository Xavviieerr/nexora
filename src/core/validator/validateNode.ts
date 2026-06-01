import { Node, QueryValue } from "@/core/query/types";
import { Schema } from "@/core/schema/schema";
import { operatorMatrix } from "@/core/schema/operatorMatrix";
import { ValidationError } from "./types";

function isMissingValue(value: unknown): boolean {
	return value === "" || value === null || value === undefined;
}

function isValidDateValue(value: unknown): boolean {
	if (value instanceof Date) {
		return !Number.isNaN(value.valueOf());
	}

	if (typeof value === "string") {
		return !Number.isNaN(Date.parse(value));
	}

	return false;
}

function parseRange(value: QueryValue): QueryValue[] | null {
	if (Array.isArray(value) && value.length === 2) {
		return value;
	}

	if (typeof value === "string") {
		const parts = value.split(",").map((part) => part.trim());
		return parts.length === 2 ? parts : null;
	}

	return null;
}

function isValidRegexPattern(value: QueryValue): boolean {
	if (typeof value !== "string" || value.trim() === "") {
		return false;
	}

	try {
		new RegExp(value);
		return true;
	} catch {
		return false;
	}
}

function isScalarValueValidForField(
	value: QueryValue,
	fieldType: string,
	fieldOptions?: string[],
): boolean {
	if (isMissingValue(value) || Array.isArray(value)) {
		return false;
	}

	switch (fieldType) {
		case "string":
			return typeof value === "string";
		case "number":
			return typeof value === "number";
		case "date":
			return isValidDateValue(value);
		case "enum":
			return typeof value === "string" && (fieldOptions ?? []).includes(value);
		default:
			return false;
	}
}

function isArrayValueValidForField(
	value: QueryValue,
	fieldType: string,
	fieldOptions?: string[],
): boolean {
	if (!Array.isArray(value) || value.length === 0) {
		return false;
	}

	switch (fieldType) {
		case "string":
			return value.every((item) => typeof item === "string");
		case "number":
			return value.every((item) => typeof item === "number");
		case "date":
			return value.every((item) => isValidDateValue(item));
		case "enum":
			return value.every(
				(item) =>
					typeof item === "string" && (fieldOptions ?? []).includes(item),
			);
		default:
			return false;
	}
}

export function validateNode(node: Node, schema: Schema): ValidationError[] {
	if (node.type !== "rule") {
		return [];
	}

	const errors: ValidationError[] = [];

	if (!node.field) {
		errors.push({
			nodeId: node.id,
			message: "Missing field",
		});
		return errors;
	}

	const field = schema.fields.find((f) => f.name === node.field);
	if (!field) {
		return [
			{
				nodeId: node.id,
				message: `Unknown field: ${node.field}`,
			},
		];
	}

	const allowedOperators = operatorMatrix[field.type];
	if (!allowedOperators.includes(node.operator)) {
		errors.push({
			nodeId: node.id,
			message: `Invalid operator ${node.operator} for ${node.field}`,
		});
		return errors;
	}

	if (node.operator === "isNull" || node.operator === "isNotNull") {
		return errors;
	}

	if (isMissingValue(node.value)) {
		errors.push({
			nodeId: node.id,
			message: "Missing value",
		});
		return errors;
	}

	if (node.operator === "regex") {
		if (!isValidRegexPattern(node.value)) {
			errors.push({
				nodeId: node.id,
				message: "Invalid regex pattern",
			});
		}
		return errors;
	}

	if (node.operator === "between") {
		const range = parseRange(node.value);
		if (!range) {
			errors.push({
				nodeId: node.id,
				message: "Between requires two values (min, max)",
			});
			return errors;
		}

		if (
			!isScalarValueValidForField(range[0], field.type, field.options) ||
			!isScalarValueValidForField(range[1], field.type, field.options)
		) {
			errors.push({
				nodeId: node.id,
				message: `Between values are invalid for field type ${field.type}`,
			});
		}
		return errors;
	}

	if (node.operator === "in") {
		if (!Array.isArray(node.value) || node.value.length === 0) {
			errors.push({
				nodeId: node.id,
				message: "In operator requires a non-empty array of values",
			});
			return errors;
		}

		if (!isArrayValueValidForField(node.value, field.type, field.options)) {
			errors.push({
				nodeId: node.id,
				message: `In values are invalid for field type ${field.type}`,
			});
		}
		return errors;
	}

	if (!isScalarValueValidForField(node.value, field.type, field.options)) {
		errors.push({
			nodeId: node.id,
			message: `Invalid value for field type ${field.type}`,
		});
	}

	return errors;
}
