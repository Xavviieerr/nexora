import { useQueryStore } from "@/state/queryStore";
import { useHistoryStore } from "../store/historyStore";

export function useQueryHistory() {
	const tree = useQueryStore((s) => s.tree);
	const setTree = useQueryStore((s) => s.setTree);

	const { save, undo, redo, history, currentIndex } = useHistoryStore();

	const saveSnapshot = () => {
		save(tree);
	};

	const restore = (index: number) => {
		const snapshot = history[index];
		if (!snapshot) return;

		setTree(structuredClone(snapshot));
	};

	return {
		saveSnapshot,
		restore,
		undo,
		redo,
		history,
		currentIndex,
	};
}
