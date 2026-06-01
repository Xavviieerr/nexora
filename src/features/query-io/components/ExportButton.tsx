"use client";

import { useQueryStore } from "@/state/queryStore";
import { toast } from "react-toastify";

export default function ExportButton() {
	const exportQuery = useQueryStore((s) => s.exportQuery);

	const handleExport = () => {
		try {
			const json = exportQuery();
			navigator.clipboard.writeText(json);
			toast.success("Query copied to clipboard", { autoClose: 2000 });
		} catch (error) {
			toast.error("Failed to copy query", { autoClose: 2000 });
		}
	};

	return (
		<button className="btn" onClick={handleExport}>
			Export Query
		</button>
	);
}
