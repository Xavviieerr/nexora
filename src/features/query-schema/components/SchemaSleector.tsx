"use client";

import { useQueryStore } from "@/state/queryStore";
import { schemas } from "@/core/schema/schema";

export default function SchemaSelector() {
	const schemaId = useQueryStore((s) => s.schemaId);
	const setSchema = useQueryStore((s) => s.setSchema);

	return (
		<div
			style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}
		>
			<span
				style={{
					fontSize: 11,
					color: "var(--text-tertiary)",
					fontWeight: 500,
				}}
			>
				Schema
			</span>

			<select
				className="nx-select"
				value={schemaId}
				onChange={(e) => setSchema(e.target.value)}
				style={{
					height: 28,
					fontSize: 12,
					padding: "0 var(--space-2)",
					minWidth: 140,
				}}
			>
				{schemas.map((s) => (
					<option key={s.id} value={s.id}>
						{s.label}
					</option>
				))}
			</select>
		</div>
	);
}
