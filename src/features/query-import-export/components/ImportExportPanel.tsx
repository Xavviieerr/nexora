"use client";

import ExportButton from "./ExportButton";
import ImportButton from "./ImportButton";

export default function ImportExportPanel() {
	return (
		<div
			style={{
				marginTop: 24,
				padding: 16,
				border: "1px solid #ccc",
				borderRadius: 8,
				display: "flex",
				gap: 12,
				alignItems: "center",
			}}
		>
			<h3 style={{ margin: 0 }}>Import / Export</h3>

			<ExportButton />

			<ImportButton />
		</div>
	);
}
