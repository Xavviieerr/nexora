"use client";

import ExportButton from "./ExportButton";
import ImportButton from "./ImportButton";

export default function ImportExportPanel() {
	return (
		<div
			style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}
		>
			<ExportButton />
			<ImportButton />
		</div>
	);
}
