import { memo } from "react";
import { Node } from "@/core/query/types";
import RuleNode from "./RuleNode";
import GroupNode from "./GroupNode";
import { ValidationError } from "@/core/validator/types";

type Props = {
	node: Node;
	errorMap: Map<string, ValidationError[]>;
};

function NodeRendererBase({ node, errorMap }: Props) {
	const nodeErrors = errorMap.get(node.id) ?? [];

	if (node.type === "rule") {
		return <RuleNode node={node} errors={nodeErrors} />;
	}

	return (
		<GroupNode node={node} errors={nodeErrors}>
			{node.children.map((child) => (
				<NodeRenderer key={child.id} node={child} errorMap={errorMap} />
			))}
		</GroupNode>
	);
}

const NodeRenderer = memo(NodeRendererBase);

export default NodeRenderer;
