import { create } from "zustand";
import { Node } from "@/core/query/types";

type HistoryStore = {
	history: Node[];
	currentIndex: number;

	save: (tree: Node) => void;
	undo: () => void;
	redo: () => void;
	goTo: (index: number) => void;
};

export const useHistoryStore = create<HistoryStore>((set, get) => ({
	history: [],
	currentIndex: -1,

	save: (tree) => {
		const state = get();

		const newHistory = state.history.slice(0, state.currentIndex + 1);

		newHistory.push(structuredClone(tree));

		set({
			history: newHistory,
			currentIndex: newHistory.length - 1,
		});
	},

	undo: () => {
		const state = get();

		if (state.currentIndex <= 0) return;

		const newIndex = state.currentIndex - 1;

		set({
			currentIndex: newIndex,
		});
	},

	redo: () => {
		const state = get();

		if (state.currentIndex >= state.history.length - 1) return;

		set({
			currentIndex: state.currentIndex + 1,
		});
	},

	goTo: (index) => {
		set({ currentIndex: index });
	},
}));
