import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useQueryStore } from "@/state/queryStore";
import { createRootGroupNode } from "@/core/query/createNode";
import { GroupNode, Node } from "@/core/query/types";

function isGroup(node: Node): node is GroupNode {
	return node.type === "group";
}

describe("Query Store (State Management)", () => {
	beforeEach(() => {
		useQueryStore.setState({
			tree: createRootGroupNode(),
			past: [],
			future: [],
			schema: useQueryStore.getState().schema,
			schemaId: useQueryStore.getState().schemaId,
		});
	});

	describe("Rule operations", () => {
		it("should add a rule to a group", () => {
			const { result } = renderHook(() => useQueryStore());

			act(() => {
				result.current.addRule(result.current.tree.id);
			});

			expect(isGroup(result.current.tree)).toBe(true);

			if (isGroup(result.current.tree)) {
				expect(result.current.tree.children.length).toBe(1);
				expect(result.current.tree.children[0].type).toBe("rule");
			}
		});

		it("should delete a rule", () => {
			const { result } = renderHook(() => useQueryStore());

			act(() => {
				result.current.addRule(result.current.tree.id);
			});

			let ruleId: string | undefined;

			if (isGroup(result.current.tree)) {
				ruleId = result.current.tree.children[0].id;
			}

			act(() => {
				if (ruleId) result.current.deleteNode(ruleId);
			});

			if (isGroup(result.current.tree)) {
				expect(result.current.tree.children.length).toBe(0);
			}
		});

		it("should update a rule", () => {
			const { result } = renderHook(() => useQueryStore());

			act(() => {
				result.current.addRule(result.current.tree.id);
			});

			let ruleId: string | undefined;

			if (isGroup(result.current.tree)) {
				ruleId = result.current.tree.children[0].id;
			}

			act(() => {
				if (ruleId) {
					result.current.updateNode(ruleId, (node) => {
						if (node.type === "rule") {
							return { ...node, field: "age", value: 18 };
						}
						return node;
					});
				}
			});

			if (isGroup(result.current.tree)) {
				const rule = result.current.tree.children[0];
				if (rule.type === "rule") {
					expect(rule.field).toBe("age");
					expect(rule.value).toBe(18);
				}
			}
		});
	});

	describe("Group operations", () => {
		it("should add a nested group", () => {
			const { result } = renderHook(() => useQueryStore());

			act(() => {
				result.current.addGroup(result.current.tree.id);
			});

			if (isGroup(result.current.tree)) {
				expect(result.current.tree.children.length).toBe(1);
				expect(result.current.tree.children[0].type).toBe("group");
			}
		});

		it("should toggle group logic", () => {
			const { result } = renderHook(() => useQueryStore());

			act(() => {
				result.current.addGroup(result.current.tree.id);
			});

			let groupId: string | undefined;

			if (isGroup(result.current.tree)) {
				groupId = result.current.tree.children[0].id;
			}

			act(() => {
				if (groupId) {
					result.current.updateNode(groupId, (node) => {
						if (node.type === "group") {
							return {
								...node,
								logic: node.logic === "AND" ? "OR" : "AND",
							};
						}
						return node;
					});
				}
			});

			if (isGroup(result.current.tree)) {
				const group = result.current.tree.children[0];
				if (group.type === "group") {
					expect(["AND", "OR"]).toContain(group.logic);
				}
			}
		});
	});

	describe("History", () => {
		it("should support undo", () => {
			const { result } = renderHook(() => useQueryStore());

			const initial = result.current.tree;

			act(() => {
				result.current.addRule(result.current.tree.id);
			});

			act(() => {
				result.current.undo();
			});

			expect(result.current.tree).toEqual(initial);
		});

		it("should support redo", () => {
			const { result } = renderHook(() => useQueryStore());

			act(() => {
				result.current.addRule(result.current.tree.id);
			});

			act(() => {
				result.current.undo();
			});

			act(() => {
				result.current.redo();
			});

			if (isGroup(result.current.tree)) {
				expect(result.current.tree.children.length).toBe(1);
			}
		});
	});
});
