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

	return <button onClick={handleExport}>Export Query</button>;
}
