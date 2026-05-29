"use client";

import NodeRenderer from "@/features/query-builder/components/NodeRenderer";
import { useQueryStore } from "@/state/queryStore";

export default function Page() {
	const tree = useQueryStore((s) => s.tree);

	return (
		<div style={{ padding: 20 }}>
			<NodeRenderer node={tree} />
		</div>
	);
}
