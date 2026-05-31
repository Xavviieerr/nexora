import { memo } from "react";
import { Node } from "@/core/query/types";
import RuleNode from "./RuleNode";
import GroupNode from "./GroupNode";

type Props = {
	node: Node;
};

function NodeRendererBase({ node }: Props) {
	if (node.type === "rule") {
		return <RuleNode node={node} />;
	}

	return (
		<GroupNode node={node}>
			{node.children.map((child) => (
				<NodeRenderer key={child.id} node={child} />
			))}
		</GroupNode>
	);
}

// IMPORTANT: prevents re-render unless node reference changes
const NodeRenderer = memo(NodeRendererBase);

export default NodeRenderer;
