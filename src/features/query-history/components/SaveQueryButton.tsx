"use client";

import { useQueryStore } from "@/state/queryStore";
import { useHistoryStore } from "../store/historyStore";

export default function SaveQueryButton() {
	const tree = useQueryStore((s) => s.tree);
	const addToHistory = useHistoryStore((s) => s.addToHistory);

	const handleSave = () => {
		addToHistory(tree);
	};

	return (
		<button className="btn btn-accent" onClick={handleSave} title="Save query">
			<svg
				width="12"
				height="12"
				viewBox="0 0 16 16"
				fill="none"
				stroke="currentColor"
				strokeWidth="1.8"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<path d="M3 2h8l2 2v10H3z" />
				<path d="M5 2v4h6V2" />
				<path d="M5 11h6" />
			</svg>
			Save
		</button>
	);
}
