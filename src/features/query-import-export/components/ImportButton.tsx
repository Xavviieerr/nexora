"use client";

import { ChangeEvent } from "react";
import { isValidNode } from "@/core/query/isValidNode";
import { useQueryStore } from "@/state/queryStore";

export default function ImportButton() {
	const setTree = useQueryStore((s) => s.setTree);

	const handleImport = async (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];

		if (!file) {
			return;
		}

		try {
			const text = await file.text();

			const parsed = JSON.parse(text);

			if (!isValidNode(parsed)) {
				alert("Invalid query structure");
				return;
			}

			setTree(parsed);
		} catch {
			alert("Unable to import file");
		}
	};

	return (
		<label>
			Import Query
			<input
				type="file"
				accept=".json"
				onChange={handleImport}
				style={{ display: "none" }}
			/>
		</label>
	);
}
