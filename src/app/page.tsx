"use client";

import NodeRenderer from "@/features/query-builder/components/NodeRenderer";
import { useQueryStore } from "@/state/queryStore";
import { compileMongo } from "@/core/compiler/compileMongo";
import { validateTree } from "@/core/validator/validateTree";

export default function Page() {
	const tree = useQueryStore((s) => s.tree);
	const errors = validateTree(tree);
	const compiledQuery = compileMongo(tree);

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
				</div>

				<div>
					<h2>Mongo Query Preview</h2>

					<pre
						style={{
							background: "#111",
							color: "#0f0",
							padding: 16,
							borderRadius: 8,
							overflow: "auto",
						}}
					>
						{JSON.stringify(compiledQuery, null, 2)}
					</pre>
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
