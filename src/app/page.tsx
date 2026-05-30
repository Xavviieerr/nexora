"use client";

import NodeRenderer from "@/features/query-builder/components/NodeRenderer";
import { useQueryStore } from "@/state/queryStore";
import { validateTree } from "@/core/validator/validateTree";

import ExecutionPanel from "@/features/query-execution/components/ExecutionPanel";
import QueryPreviewPanel from "@/features/query-preview/components/QueryPreviewPanel";

export default function Page() {
	const tree = useQueryStore((s) => s.tree);
	const errors = validateTree(tree);

	return (
		<div style={{ padding: 20 }}>
			<h1>Nexora</h1>

			<div
				style={{
					display: "grid",
					gridTemplateColumns: "1fr 1fr",
					gap: 20,
				}}
			>
				<div>
					<h2>Query Builder</h2>

					<NodeRenderer node={tree} />
					<ExecutionPanel />
				</div>

				<div>
					<h2>Query Preview</h2>
					<QueryPreviewPanel />
				</div>
			</div>

			<div style={{ color: "red" }}>
				{errors.map((e, i) => (
					<div key={i}>{e}</div>
				))}
			</div>
		</div>
	);
}
