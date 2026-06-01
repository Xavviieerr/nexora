import { describe, it, expect } from "vitest";
import { compileMongo } from "@/core/compiler/compileMongo";
import { compileSQL } from "@/features/query-preview/engine/compileToSQL";
import { createMockTree } from "./utils/mockTree";

describe("Query Compilers", () => {
	const tree = createMockTree();

	it("compiles Mongo query correctly", () => {
		const result = compileMongo(tree);

		expect(result).toHaveProperty("$and");
	});

	it("compiles SQL query correctly", () => {
		const result = compileSQL(tree);

		expect(typeof result).toBe("string");
		expect(result.length).toBeGreaterThan(0);
	});
});
