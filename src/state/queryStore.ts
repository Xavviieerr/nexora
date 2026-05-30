import { create } from "zustand";
import { Node } from "@/core/query/types";
import { createGroupNode, createRuleNode } from "@/core/query/createNode";
import { updateNode as updateTree } from "@/core/query/updateNode";
import { deleteNode as deleteTree } from "@/core/query/deleteNode";
import { defaultSchema, Schema } from "@/core/schema/schema";

type QueryStore = {
	tree: Node;
	schema: Schema;

	addRule: (parentId: string) => void;
	addGroup: (parentId: string) => void;

	updateNode: (id: string, updater: (node: Node) => Node) => void;
	deleteNode: (id: string) => void;

	setTree: (tree: Node) => void;
};

export const useQueryStore = create<QueryStore>((set, get) => ({
	tree: createGroupNode(),
	schema: defaultSchema,

	setTree: (tree) => set({ tree }),

	addRule: (parentId) => {
		const newRule = createRuleNode();

		const updated = updateTree(get().tree, parentId, (node) => {
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

		const updated = updateTree(get().tree, parentId, (node) => {
			if (node.type !== "group") return node;

			return {
				...node,
				children: [...node.children, newGroup],
			};
		});

		set({ tree: updated });
	},

	updateNode: (id, updater) => {
		const updated = updateTree(get().tree, id, updater);
		set({ tree: updated });
	},

	deleteNode: (id) => {
		const updated = deleteTree(get().tree, id);
		set({ tree: updated ?? createGroupNode() });
	},
}));
