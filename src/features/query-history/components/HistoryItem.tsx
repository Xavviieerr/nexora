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

	const handleRestore = () => {
		setTree(item.tree);
	};

	return (
		<div
			style={{
				border: "1px solid #333",
				padding: 8,
				marginBottom: 8,
				borderRadius: 6,
			}}
		>
			<div style={{ fontSize: 12 }}>{item.label}</div>

			<div style={{ fontSize: 10, opacity: 0.7 }}>
				{new Date(item.timestamp).toLocaleString()}
			</div>

			<div
				style={{
					display: "flex",
					gap: 6,
					marginTop: 6,
				}}
			>
				<button onClick={handleRestore}>Restore</button>

				<button onClick={() => removeFromHistory(item.id)}>Delete</button>
			</div>
		</div>
	);
}
