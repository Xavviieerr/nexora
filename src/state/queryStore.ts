import { create } from "zustand";
import { Node } from "@/core/query/types";
import { createGroupNode } from "@/core/query/createNode";
import { updateNode } from "@/core/query/updateNode";
import { deleteNode } from "@/core/query/deleteNode";

type QueryState = {
	tree: Node;

	setTree: (tree: Node) => void;

	addRule: (parentId: string, node: Node) => void;
	updateNodeById: (id: string, updater: (node: Node) => Node) => void;
	deleteNodeById: (id: string) => void;
};

export const useQueryStore = create<QueryState>((set, get) => ({
	// initial state = empty root group
	tree: createGroupNode(),

	setTree: (tree) => set({ tree }),

	addRule: (parentId, node) => {
		const current = get().tree;

		const updated = updateNode(current, parentId, (parent) => {
			if (parent.type === "group") {
				return {
					...parent,
					children: [...parent.children, node],
				};
			}
			return parent;
		});

		set({ tree: updated });
	},

	updateNodeById: (id, updater) => {
		const current = get().tree;
		const updated = updateNode(current, id, updater);
		set({ tree: updated });
	},

	deleteNodeById: (id) => {
		const current = get().tree;
		const updated = deleteNode(current, id) ?? createGroupNode();
		set({ tree: updated });
	},
}));
