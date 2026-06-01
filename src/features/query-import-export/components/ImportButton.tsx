"use client";

import { ChangeEvent } from "react";
import { useQueryStore } from "@/state/queryStore";

export default function ImportButton() {
	const importQuery = useQueryStore((s) => s.importQuery);

	const handleImport = async (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (!file) return;

		try {
			const text = await file.text();
			importQuery(text);
			event.target.value = "";
		} catch {
			alert("Unable to import file");
		}
	};

	return (
		<label className="import-label" title="Import query from JSON">
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
				<path d="M8 6v7M5 9l3-3 3 3" />
				<path d="M3 12h10" />
			</svg>
			Import
			<input
				type="file"
				accept=".json"
				onChange={handleImport}
				style={{ display: "none" }}
			/>
		</label>
	);
}
