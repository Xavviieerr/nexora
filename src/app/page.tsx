"use client";

import NodeRenderer from "@/features/query-builder/components/NodeRenderer";
import { useQueryStore } from "@/state/queryStore";
import { validateTree } from "@/core/validator/validateTree";

import ExecutionPanel from "@/features/query-execution/components/ExecutionPanel";
import QueryPreviewPanel from "@/features/query-preview/components/QueryPreviewPanel";
import HistoryPanel from "@/features/query-history/components/HistoryPanel";

export default function Page() {
	const tree = useQueryStore((s) => s.tree);
	const schema = useQueryStore((s) => s.schema);
	const errors = validateTree(tree, schema);

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

					<NodeRenderer node={tree} isRoot={true} />
					<ExecutionPanel />
				</div>

				<div>
					<h2>Query Preview</h2>
					<QueryPreviewPanel />
					<HistoryPanel />
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
