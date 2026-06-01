"use client";

import { useQueryStore } from "@/state/queryStore";
import { schemas } from "@/core/schema/schema";

export default function SchemaSelector() {
	const schemaId = useQueryStore((s) => s.schemaId);
	const setSchema = useQueryStore((s) => s.setSchema);

	return (
		<div style={{ display: "flex", alignItems: "center", gap: 8 }}>
			<span style={{ fontSize: 12, opacity: 0.7 }}>Schema:</span>

			<select
				value={schemaId}
				onChange={(e) => setSchema(e.target.value)}
				style={{
					padding: "4px 8px",
					borderRadius: 6,
					border: "1px solid #ccc",
				}}
			>
				{schemas.map((schema) => (
					<option key={schema.id} value={schema.id}>
						{schema.label}
					</option>
				))}
			</select>
		</div>
	);
}
