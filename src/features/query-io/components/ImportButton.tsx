"use client";

import { useState } from "react";
import { useQueryStore } from "@/state/queryStore";

export default function ImportButton() {
	const importQuery = useQueryStore((s) => s.importQuery);
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState("");

	const handleImport = () => {
		try {
			importQuery(value);
			setOpen(false);
			setValue("");
		} catch {
			alert("Invalid query JSON");
		}
	};

	if (!open) {
		return <button onClick={() => setOpen(true)}>Import Query</button>;
	}

	return (
		<div style={{ marginTop: 10 }}>
			<textarea
				value={value}
				onChange={(e) => setValue(e.target.value)}
				placeholder="Paste query JSON"
				rows={6}
				style={{ width: "100%" }}
			/>

			<div style={{ display: "flex", gap: 8 }}>
				<button onClick={handleImport}>Load</button>
				<button onClick={() => setOpen(false)}>Cancel</button>
			</div>
		</div>
	);
}
