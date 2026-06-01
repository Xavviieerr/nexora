import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useQueryStore } from "@/state/queryStore";
import {
	createRuleNode,
	createGroupNode,
	createRootGroupNode,
} from "@/core/query/createNode";

describe("Query Store (State Management)", () => {
	beforeEach(() => {
		// Reset store state before each test
		useQueryStore.setState({
			tree: createRootGroupNode(),
			past: [],
			future: [],
		});
	});

	describe("Rule operations", () => {
		it("should add a rule to a group", () => {
			const { result } = renderHook(() => useQueryStore());

			act(() => {
				result.current.addRule(result.current.tree.id);
			});

			expect(result.current.tree.children.length).toBe(1);
			expect(result.current.tree.children[0].type).toBe("rule");
		});

		it("should delete a rule", () => {
			const { result } = renderHook(() => useQueryStore());

			act(() => {
				result.current.addRule(result.current.tree.id);
			});

			const ruleId = result.current.tree.children[0].id;

			act(() => {
				result.current.deleteNode(ruleId);
			});

			expect(result.current.tree.children.length).toBe(0);
		});

		it("should update a rule", () => {
			const { result } = renderHook(() => useQueryStore());

			act(() => {
				result.current.addRule(result.current.tree.id);
			});

			const ruleId = result.current.tree.children[0].id;

			act(() => {
				result.current.updateNode(ruleId, (node) => {
					if (node.type === "rule") {
						return { ...node, field: "age", value: 18 };
					}
					return node;
				});
			});

			const rule = result.current.tree.children[0];
			expect(rule.type).toBe("rule");
			if (rule.type === "rule") {
				expect(rule.field).toBe("age");
				expect(rule.value).toBe(18);
			}
		});
	});

	describe("Group operations", () => {
		it("should add a nested group", () => {
			const { result } = renderHook(() => useQueryStore());

			act(() => {
				result.current.addGroup(result.current.tree.id);
			});

			expect(result.current.tree.children.length).toBe(1);
			expect(result.current.tree.children[0].type).toBe("group");
		});

		it("should toggle group logic between AND and OR", () => {
			const { result } = renderHook(() => useQueryStore());

			act(() => {
				result.current.addGroup(result.current.tree.id);
			});

			const groupId = result.current.tree.children[0].id;

			act(() => {
				result.current.updateNode(groupId, (node) => {
					if (node.type === "group") {
						return { ...node, logic: node.logic === "AND" ? "OR" : "AND" };
					}
					return node;
				});
			});

			const group = result.current.tree.children[0];
			expect(group.type).toBe("group");
			if (group.type === "group") {
				expect(group.logic).toBe("OR");
			}
		});
	});

	describe("History management", () => {
		it("should support undo", () => {
			const { result } = renderHook(() => useQueryStore());

			const initialChildCount = result.current.tree.children.length;

			act(() => {
				result.current.addRule(result.current.tree.id);
			});

			expect(result.current.tree.children.length).toBe(initialChildCount + 1);

			act(() => {
				result.current.undo();
			});

			expect(result.current.tree.children.length).toBe(initialChildCount);
		});

		it("should support redo", () => {
			const { result } = renderHook(() => useQueryStore());

			act(() => {
				result.current.addRule(result.current.tree.id);
			});

			const countAfterAdd = result.current.tree.children.length;

			act(() => {
				result.current.undo();
			});

			const countAfterUndo = result.current.tree.children.length;

			act(() => {
				result.current.redo();
			});

			expect(result.current.tree.children.length).toBe(countAfterAdd);
			expect(result.current.tree.children.length).toBeGreaterThan(
				countAfterUndo,
			);
		});

		it("should clear redo history after new action", () => {
			const { result } = renderHook(() => useQueryStore());

			act(() => {
				result.current.addRule(result.current.tree.id);
				result.current.undo();
			});

			const hadFuture = result.current.future.length > 0;
			expect(hadFuture).toBe(true);

			act(() => {
				result.current.addRule(result.current.tree.id);
			});

			expect(result.current.future.length).toBe(0);
		});
	});

	describe("Import/Export", () => {
		it("should export query as JSON string", () => {
			const { result } = renderHook(() => useQueryStore());

			act(() => {
				result.current.addRule(result.current.tree.id);
			});

			const exported = result.current.exportQuery();

			expect(typeof exported).toBe("string");
			expect(exported).toContain("type");
			expect(exported).toContain("rule");
		});

		it("should import valid query JSON", () => {
			const { result } = renderHook(() => useQueryStore());

			const query = {
				id: "test-root",
				type: "group" as const,
				logic: "AND" as const,
				children: [
					{
						id: "test-rule",
						type: "rule" as const,
						field: "age",
						operator: "gt" as const,
						value: 18,
					},
				],
			};

			act(() => {
				result.current.importQuery(JSON.stringify(query));
			});

			expect(result.current.tree.children.length).toBe(1);
		});

		it("should reject invalid query JSON", () => {
			const { result } = renderHook(() => useQueryStore());

			expect(() => {
				result.current.importQuery('{"invalid": "json"}');
			}).toThrow();
		});
	});

	describe("Reordering", () => {
		it("should reorder children nodes", () => {
			const { result } = renderHook(() => useQueryStore());

			act(() => {
				result.current.addRule(result.current.tree.id);
				result.current.addRule(result.current.tree.id);
			});

			const firstId = result.current.tree.children[0].id;
			const secondId = result.current.tree.children[1].id;

			act(() => {
				result.current.reorderChildren(result.current.tree.id, 0, 1);
			});

			expect(result.current.tree.children[0].id).toBe(secondId);
			expect(result.current.tree.children[1].id).toBe(firstId);
		});
	});
});
