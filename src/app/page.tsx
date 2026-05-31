"use client";

import NodeRenderer from "@/features/query-builder/components/NodeRenderer";
import { useQueryStore } from "@/state/queryStore";
import { validateTree } from "@/core/validator/validateTree";

import ExecutionPanel from "@/features/query-execution/components/ExecutionPanel";
import QueryPreviewPanel from "@/features/query-preview/components/QueryPreviewPanel";
import HistoryPanel from "@/features/query-history/components/HistoryPanel";
import SaveQueryButton from "@/features/query-history/components/SaveQueryButton";

export default function Page() {
	const tree = useQueryStore((s) => s.tree);
	const schema = useQueryStore((s) => s.schema);

	const errors = validateTree(tree, schema);

	const errorMap = new Map();

	errors.forEach((error) => {
		const existing = errorMap.get(error.nodeId) ?? [];

		errorMap.set(error.nodeId, [...existing, error]);
	});

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

					<div
						style={{
							display: "flex",
							gap: 10,
							marginBottom: 16,
						}}
					>
						<SaveQueryButton />
					</div>

					<NodeRenderer node={tree} errorMap={errorMap} />

					<ExecutionPanel />
				</div>

				<div>
					<h2>Query Preview</h2>

					<QueryPreviewPanel />

					<HistoryPanel />
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
