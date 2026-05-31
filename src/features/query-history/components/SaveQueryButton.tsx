"use client";

import { useQueryStore } from "@/state/queryStore";
import { useHistoryStore } from "../store/historyStore";

export default function SaveQueryButton() {
	const tree = useQueryStore((s) => s.tree);
	const addToHistory = useHistoryStore((s) => s.addToHistory);

	const handleSave = () => {
		addToHistory(tree);
	};

	return <button onClick={handleSave}>Save Query</button>;
}
