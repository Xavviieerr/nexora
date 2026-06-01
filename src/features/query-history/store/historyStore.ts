import { create } from "zustand";
import { Node } from "@/core/query/types";

export type HistoryItem = {
	id: string;
	label: string;
	timestamp: number;
	tree: Node;
};

type HistoryStore = {
	items: HistoryItem[];

	addToHistory: (tree: Node) => void;
	removeFromHistory: (id: string) => void;
	clearHistory: () => void;
};

export const useHistoryStore = create<HistoryStore>((set) => ({
	items: [],

	addToHistory: (tree) => {
		const item: HistoryItem = {
			id: crypto.randomUUID(),
			label: "Saved Query",
			timestamp: Date.now(),
			tree,
		};

		set((state) => ({
			items: [item, ...state.items],
		}));
	},

	removeFromHistory: (id) => {
		set((state) => ({
			items: state.items.filter((i) => i.id !== id),
		}));
	},

	clearHistory: () => set({ items: [] }),
}));
