import { create } from "zustand";
import { Node } from "@/core/query/types";
import { createGroupNode, createRuleNode } from "@/core/query/createNode";
import { updateNode } from "@/core/query/updateNode";
import { deleteNode } from "@/core/query/deleteNode";

type QueryStore = {
	tree: Node;

	addRule: (parentId: string) => void;
	addGroup: (parentId: string) => void;

	updateNode: (id: string, updater: (node: Node) => Node) => void;
	deleteNode: (id: string) => void;

	setTree: (tree: Node) => void;
};

export const useQueryStore = create<QueryStore>((set, get) => ({
	tree: createGroupNode(),

	setTree: (tree) => set({ tree }),

	addRule: (parentId) => {
		const newRule = createRuleNode();

		const updated = updateNode(get().tree, parentId, (node) => {
			if (node.type !== "group") return node;

			return {
				...node,
				children: [...node.children, newRule],
			};
		});

		set({ tree: updated });
	},

	addGroup: (parentId) => {
		const newGroup = createGroupNode();

		const updated = updateNode(get().tree, parentId, (node) => {
			if (node.type !== "group") return node;

			return {
				...node,
				children: [...node.children, newGroup],
			};
		});

		set({ tree: updated });
	},

	updateNode: (id, updater) => {
		const updated = updateNode(get().tree, id, updater);
		set({ tree: updated });
	},

	deleteNode: (id) => {
		const updated = deleteNode(get().tree, id);
		set({ tree: updated ?? createGroupNode() });
	},
}));
