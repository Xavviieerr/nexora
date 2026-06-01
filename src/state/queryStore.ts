import { create } from "zustand";
import { Node } from "@/core/query/types";
import { createGroupNode, createRootGroupNode, createRuleNode } from "@/core/query/createNode";
import { updateNode as updateTree } from "@/core/query/updateNode";
import { deleteNode as deleteTree } from "@/core/query/deleteNode";
import { schemas, defaultSchema, Schema } from "@/core/schema/schema";
import { reorderNode } from "@/core/query/reorderNode";
import { isValidNode } from "@/core/query/isValidNode";
import { useExecutionStore } from "@/features/query-execution/store/executionStore";

type QueryStore = {
	tree: Node;
	schema: Schema;

	schemaId: string;
	setSchema: (id: string) => void;

	past: Node[];
	future: Node[];

	addRule: (parentId: string) => void;
	addGroup: (parentId: string) => void;

	updateNode: (id: string, updater: (node: Node) => Node) => void;
	deleteNode: (id: string) => void;

	reorderChildren: (
		parentId: string,
		fromIndex: number,
		toIndex: number,
	) => void;

	undo: () => void;
	redo: () => void;

	setTree: (tree: Node) => void;
	exportQuery: () => string;
	importQuery: (json: string) => void;
};

function pushHistory(state: QueryStore, newTree: Node): QueryStore {
	return {
		...state,
		past: [...state.past, state.tree],
		tree: newTree,
		future: [],
	};
}

export const useQueryStore = create<QueryStore>((set, get) => ({
	tree: createRootGroupNode(),
	schema: defaultSchema,
	schemaId: defaultSchema.id,

	past: [],
	future: [],

	setTree: (tree) =>
		set((state) => ({
			...state,
			past: [...state.past, state.tree],
			tree,
			future: [],
		})),

	exportQuery: () => JSON.stringify(get().tree, null, 2),

	importQuery: (json) => {
		const parsed: unknown = JSON.parse(json);

		if (!isValidNode(parsed)) {
			throw new Error("Invalid query structure");
		}

		set((state) => pushHistory(state, parsed));
	},

	addRule: (parentId) => {
		const newRule = createRuleNode();

		const updated = updateTree(get().tree, parentId, (node) => {
			if (node.type !== "group") return node;

			return {
				...node,
				children: [...node.children, newRule],
			};
		});

		set((state) => pushHistory(state, updated));
	},

	addGroup: (parentId) => {
		const newGroup = createGroupNode();

		const updated = updateTree(get().tree, parentId, (node) => {
			if (node.type !== "group") return node;

			return {
				...node,
				children: [...node.children, newGroup],
			};
		});

		set((state) => pushHistory(state, updated));
	},

	updateNode: (id, updater) => {
		const updated = updateTree(get().tree, id, updater);
		set((state) => pushHistory(state, updated));
	},

	deleteNode: (id) => {
		const updated = deleteTree(get().tree, id);
		set((state) => pushHistory(state, updated ?? createRootGroupNode()));
	},

	reorderChildren: (parentId, fromIndex, toIndex) => {
		const updated = reorderNode(get().tree, parentId, fromIndex, toIndex);
		set((state) => pushHistory(state, updated));
	},

	undo: () => {
		const state = get();
		if (state.past.length === 0) return;

		const previous = state.past[state.past.length - 1];
		const newPast = state.past.slice(0, -1);

		set({
			tree: previous,
			past: newPast,
			future: [state.tree, ...state.future],
		});
	},

	redo: () => {
		const state = get();
		if (state.future.length === 0) return;

		const next = state.future[0];
		const newFuture = state.future.slice(1);

		set({
			tree: next,
			past: [...state.past, state.tree],
			future: newFuture,
		});
	},

	setSchema: (id: string) => {
		const nextSchema = schemas.find((s) => s.id === id);
		if (!nextSchema) return;

		// reset execution results (IMPORTANT FIX)
		useExecutionStore.getState().setResults([]);

		set((state) => ({
			...state,
			schemaId: id,
			schema: nextSchema,
			tree: createRootGroupNode(),
			past: [],
			future: [],
		}));
	},
}));
