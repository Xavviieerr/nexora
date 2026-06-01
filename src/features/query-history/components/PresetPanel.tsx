"use client";

import { useQueryStore } from "@/state/queryStore";
import { defaultPresets } from "../presets/defaultPresets";

export default function PresetPanel() {
	const setTree = useQueryStore((s) => s.setTree);

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				gap: "var(--space-3)",
			}}
		>
			<span
				className="section-label"
				style={{ marginBottom: 0, borderBottom: "none", paddingBottom: 0 }}
			>
				Presets
			</span>

			<div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
				{defaultPresets.map((preset) => (
					<button
						key={preset.name}
						className="btn"
						onClick={() => setTree(structuredClone(preset.tree))}
						style={{
							justifyContent: "space-between",
							height: "auto",
							minHeight: 34,
							padding: "var(--space-2) var(--space-3)",
						}}
					>
						<span>{preset.name}</span>
						<span className="tag tag-neutral">
							{preset.tree.children.length} rule
							{preset.tree.children.length !== 1 ? "s" : ""}
						</span>
					</button>
				))}
			</div>
		</div>
	);
}
