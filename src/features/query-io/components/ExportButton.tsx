"use client";

import { useQueryStore } from "@/state/queryStore";

export default function ExportButton() {
	const exportQuery = useQueryStore((s) => s.exportQuery);

	const handleExport = () => {
		const json = exportQuery();
		navigator.clipboard.writeText(json);
		alert("Query copied to clipboard");
	};

	return (
		<button className="btn" onClick={handleExport}>
			Export Query
		</button>
	);
}
