import { useQueryStore } from "@/state/queryStore";
import { useHistoryStore } from "../store/historyStore";

export function useQueryHistory() {
	const tree = useQueryStore((s) => s.tree);
	const setTree = useQueryStore((s) => s.setTree);
	const undo = useQueryStore((s) => s.undo);
	const redo = useQueryStore((s) => s.redo);

	const items = useHistoryStore((s) => s.items);
	const addToHistory = useHistoryStore((s) => s.addToHistory);

	const saveSnapshot = () => {
		addToHistory(tree);
	};

	const restore = (index: number) => {
		const item = items[index];
		if (!item) return;

		setTree(structuredClone(item.tree));
	};

	return {
		saveSnapshot,
		restore,
		undo,
		redo,
		history: items.map((item) => item.tree),
		currentIndex: items.length > 0 ? 0 : -1,
	};
}
