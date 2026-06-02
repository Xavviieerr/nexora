import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useQueryStore } from "@/state/queryStore";
import { createRootGroupNode } from "@/core/query/createNode";
import { compileMongo } from "@/core/compiler/compileMongo";
import { validateTree } from "@/core/validator/validateTree";
import { executeQuery } from "@/features/query-execution/engine/executeQuery";
import { mockDataset } from "@/features/query-execution/data/mockDataset";
import { useExecutionStore } from "@/features/query-execution/store/executionStore";

function getRootGroup(tree: any) {
	return tree.type === "group" ? tree : null;
}

describe("Nexora Integration Tests", () => {
	beforeEach(() => {
		useQueryStore.setState({
			tree: createRootGroupNode(),
			past: [],
			future: [],
			schema: useQueryStore.getState().schema,
			schemaId: useQueryStore.getState().schemaId,
		});

		useExecutionStore.getState().setResults([]);
	});

	// -----------------------------
	// 1. FULL PIPELINE TEST
	// -----------------------------
	it("should build query → compile → execute end-to-end", () => {
		const { result } = renderHook(() => useQueryStore());

		act(() => {
			result.current.addRule(result.current.tree.id);
		});

		let ruleId: string = "";

		if (result.current.tree.type === "group") {
			ruleId = result.current.tree.children[0].id;
		}

		act(() => {
			result.current.updateNode(ruleId, (node) => {
				if (node.type === "rule") {
					return {
						...node,
						field: "age",
						operator: "gt",
						value: 18,
					};
				}
				return node;
			});
		});

		const tree = result.current.tree;

		// compile
		const compiled = compileMongo(tree);
		expect(compiled).toBeDefined();
		expect(JSON.stringify(compiled)).toContain("$gt");

		// validate
		const errors = validateTree(tree, result.current.schema);
		expect(errors.length).toBe(0);

		// execute
		const results = executeQuery(tree, mockDataset.users);
		expect(Array.isArray(results)).toBe(true);
	});

	// -----------------------------
	// 2. SCHEMA VALIDATION EDGE CASE
	// -----------------------------
	it("should return validation errors for invalid field", () => {
		const { result } = renderHook(() => useQueryStore());

		act(() => {
			result.current.addRule(result.current.tree.id);
		});

		let ruleId = "";

		if (result.current.tree.type === "group") {
			ruleId = result.current.tree.children[0].id;
		}

		act(() => {
			result.current.updateNode(ruleId, (node) => {
				if (node.type === "rule") {
					return {
						...node,
						field: "fakeField",
						operator: "gt",
						value: 10,
					};
				}
				return node;
			});
		});

		const errors = validateTree(result.current.tree, result.current.schema);

		expect(errors.length).toBeGreaterThan(0);
		expect(errors[0].message).toContain("Unknown field");
	});

	// -----------------------------
	// 3. EMPTY VALUE EDGE CASE
	// -----------------------------
	it("should fail validation for empty rule value", () => {
		const { result } = renderHook(() => useQueryStore());

		act(() => {
			result.current.addRule(result.current.tree.id);
		});

		let ruleId = "";

		if (result.current.tree.type === "group") {
			ruleId = result.current.tree.children[0].id;
		}

		act(() => {
			result.current.updateNode(ruleId, (node) => {
				if (node.type === "rule") {
					return {
						...node,
						field: "age",
						operator: "gt",
						value: "",
					};
				}
				return node;
			});
		});

		const errors = validateTree(result.current.tree, result.current.schema);

		expect(errors.some((e) => e.message === "Missing value")).toBe(true);
	});

	// -----------------------------
	// 4. SCHEMA SWITCH RESET STATE
	// -----------------------------
	it("should reset query tree when schema changes", () => {
		const { result } = renderHook(() => useQueryStore());

		act(() => {
			result.current.addRule(result.current.tree.id);
		});

		act(() => {
			result.current.setSchema("orders");
		});

		expect(result.current.tree.type).toBe("group");

		if (result.current.tree.type === "group") {
			expect(result.current.tree.children.length).toBe(0);
		}
	});

	// -----------------------------
	// 5. UNDO/REDO CONSISTENCY
	// -----------------------------
	it("should maintain AST consistency across undo/redo", () => {
		const { result } = renderHook(() => useQueryStore());

		act(() => {
			result.current.addRule(result.current.tree.id);
		});

		const afterAdd = result.current.tree;

		act(() => {
			result.current.undo();
		});

		act(() => {
			result.current.redo();
		});

		expect(result.current.tree.type).toBe(afterAdd.type);

		if (result.current.tree.type === "group" && afterAdd.type === "group") {
			expect(result.current.tree.children.length).toBe(
				afterAdd.children.length,
			);
		}
	});
});
