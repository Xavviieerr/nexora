"use client";

import { useHistoryStore } from "../store/historyStore";
import HistoryItem from "./HistoryItem";

export default function HistoryPanel() {
	const items = useHistoryStore((s) => s.items);

	return (
		<div
			style={{
				marginTop: 20,
				padding: 12,
				borderTop: "1px solid #222",
			}}
		>
			<h3>Query History</h3>

			{items.length === 0 ? (
				<div style={{ fontSize: 12 }}>No saved queries</div>
			) : (
				items.map((item) => <HistoryItem key={item.id} item={item} />)
			)}
		</div>
	);
}
