"use client";

import { useQueryStore } from "@/state/queryStore";
import { defaultPresets } from "../presets/defaultPresets";

export default function PresetPanel() {
	const setTree = useQueryStore((s) => s.setTree);

	return (
		<div
			style={{
				marginTop: 20,
				padding: 12,
				borderTop: "1px solid #222",
			}}
		>
			<h3>Presets</h3>
			<div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
				{defaultPresets.map((preset) => (
					<button
						key={preset.name}
						onClick={() => setTree(structuredClone(preset.tree))}
					>
						{preset.name}
					</button>
				))}
			</div>
		</div>
	);
}
