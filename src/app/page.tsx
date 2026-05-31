"use client";

import NodeRenderer from "@/features/query-builder/components/NodeRenderer";
import { useQueryStore } from "@/state/queryStore";
import { validateTree } from "@/core/validator/validateTree";

import ExecutionPanel from "@/features/query-execution/components/ExecutionPanel";
import QueryPreviewPanel from "@/features/query-preview/components/QueryPreviewPanel";
import HistoryPanel from "@/features/query-history/components/HistoryPanel";
import ExportButton from "@/features/query-io/components/ExportButton";
import ImportButton from "@/features/query-io/components/ImportButton";
import SaveQueryButton from "@/features/query-history/components/SaveQueryButton";

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

					<NodeRenderer node={tree} />
					<ExecutionPanel />
				</div>

				<div>
					<h2>Query Preview</h2>
					<QueryPreviewPanel />
					<HistoryPanel />
				</div>
				<div style={{ display: "flex", gap: 10 }}>
					<SaveQueryButton />
				</div>
				<div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
					<ExportButton />
					<ImportButton />
				</div>
			</div>

			<div style={{ color: "red", marginTop: 16 }}>
				<h3>Validation Issues ({errors.length})</h3>

				{errors.length === 0 ? (
					<div style={{ color: "green" }}>All queries valid</div>
				) : (
					errors.map((err, i) => (
						<div key={i}>
							[{err.nodeId}] {err.message}
						</div>
					))
				)}
			</div>
		</div>
	);
}
