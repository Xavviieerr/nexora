"use client";

import { useState } from "react";
import { useQueryStore } from "@/state/queryStore";
import { toast } from "react-toastify";

export default function ImportButton() {
	const importQuery = useQueryStore((s) => s.importQuery);
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState("");

	const handleImport = () => {
		try {
			importQuery(value);
			setOpen(false);
			setValue("");
			toast.success("Query imported successfully", { autoClose: 2000 });
		} catch (error) {
			toast.error("Invalid query JSON", { autoClose: 2000 });
		}
	};

	if (!open) {
		return (
			<button className="btn" onClick={() => setOpen(true)}>
				Import Query
			</button>
		);
	}

	return (
		<div
			className="panel"
			style={{
				display: "flex",
				flexDirection: "column",
				gap: "var(--space-3)",
			}}
		>
			<div className="panel-body">
				<textarea
					className="nx-textarea"
					value={value}
					onChange={(e) => setValue(e.target.value)}
					placeholder="Paste query JSON"
					rows={6}
				/>

				<div
					style={{
						display: "flex",
						gap: "var(--space-2)",
						marginTop: "var(--space-3)",
					}}
				>
					<button className="btn btn-primary" onClick={handleImport}>
						Load
					</button>
					<button className="btn btn-ghost" onClick={() => setOpen(false)}>
						Cancel
					</button>
				</div>
			</div>
		</div>
	);
}
