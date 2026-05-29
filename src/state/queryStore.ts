import { create } from "zustand";
import { Node } from "@/core/query/types";
import { createRuleNode, createGroupNode } from "@/core/query/createNode";
import { updateNode } from "@/core/query/updateNode";
import { deleteNode } from "@/core/query/deleteNode";

type QueryState = {
	tree: Node;

	addRuleToGroup: (parentId: string) => void;
	addGroupToGroup: (parentId: string) => void;
	deleteNodeById: (id: string) => void;
};

export const useQueryStore = create<QueryState>((set, get) => ({
	tree: createGroupNode(),

	addRuleToGroup: (parentId) => {
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

	addGroupToGroup: (parentId) => {
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

	deleteNodeById: (id) => {
		const updated = deleteNode(get().tree, id);
		if (updated) set({ tree: updated });
	},
}));
