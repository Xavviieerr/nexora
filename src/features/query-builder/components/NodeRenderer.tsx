import { memo } from "react";
import { Node } from "@/core/query/types";

import RuleNode from "./RuleNode";
import GroupNode from "./GroupNode";
import SortableNode from "../dnd/SortableNode";

type Props = {
	node: Node;
	depth?: number;
};

function NodeRendererBase({ node, depth = 0 }: Props) {
	if (node.type === "rule") {
		return <RuleNode node={node} />;
	}

	return (
		<GroupNode node={node} depth={depth}>
			{node.children.map((child) => (
				<SortableNode key={child.id} id={child.id}>
					<NodeRenderer node={child} depth={depth + 1} />
				</SortableNode>
			))}
		</GroupNode>
	);
}

const NodeRenderer = memo(NodeRendererBase);

export default NodeRenderer;
