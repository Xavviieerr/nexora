"use client";

import { HistoryItem as Item } from "../store/historyStore";
import { useQueryStore } from "@/state/queryStore";
import { useHistoryStore } from "../store/historyStore";

type Props = {
	item: Item;
};

export default function HistoryItem({ item }: Props) {
	const setTree = useQueryStore((s) => s.setTree);
	const removeFromHistory = useHistoryStore((s) => s.removeFromHistory);

	return (
		<div className="history-item">
			<div className="history-item-label">{item.label}</div>
			<div className="history-item-meta">
				{new Date(item.timestamp).toLocaleString()}
			</div>

			<div
				style={{
					display: "flex",
					gap: "var(--space-2)",
					marginTop: "var(--space-2)",
				}}
			>
				<button
					className="btn btn-primary btn-sm"
					onClick={() => setTree(structuredClone(item.tree))}
				>
					Restore
				</button>

				<button
					className="btn btn-danger btn-sm"
					onClick={() => removeFromHistory(item.id)}
				>
					Delete
				</button>
			</div>
		</div>
	);
}
