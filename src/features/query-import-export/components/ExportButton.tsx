"use client";

import { useQueryStore } from "@/state/queryStore";

export default function ExportButton() {
	const tree = useQueryStore((s) => s.tree);

	const handleExport = () => {
		const blob = new Blob([JSON.stringify(tree, null, 2)], {
			type: "application/json",
		});
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = "nexora-query.json";
		a.click();
		URL.revokeObjectURL(url);
	};

	return (
		<button className="btn" onClick={handleExport} title="Export query as JSON">
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
				<path d="M8 10V3M5 7l3 3 3-3" />
				<path d="M3 12h10" />
			</svg>
			Export
		</button>
	);
}
