"use client";

import { useHistoryStore } from "../store/historyStore";
import HistoryItem from "./HistoryItem";

export default function HistoryPanel() {
	const items = useHistoryStore((s) => s.items);

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				gap: "var(--space-2)",
			}}
		>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					marginBottom: "var(--space-2)",
				}}
			>
				<span
					className="section-label"
					style={{ marginBottom: 0, borderBottom: "none", paddingBottom: 0 }}
				>
					Query History
				</span>
				{items.length > 0 && (
					<span
						style={{
							fontSize: 11,
							color: "var(--text-tertiary)",
							fontFamily: "var(--font-mono)",
						}}
					>
						{items.length} saved
					</span>
				)}
			</div>

			{items.length === 0 ? (
				<div className="empty-state">
					<svg
						className="empty-state-icon"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="1.2"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<path d="M12 8v4l3 3" />
						<circle cx="12" cy="12" r="9" />
					</svg>
					<p className="empty-state-title">No saved queries yet</p>
					<p className="empty-state-body">
						Save a query to restore or compare it later.
					</p>
				</div>
			) : (
				items.map((item) => <HistoryItem key={item.id} item={item} />)
			)}
		</div>
	);
}
