import { Node } from "@/core/query/types";
import RuleNode from "./RuleNode";
import GroupNode from "./GroupNode";

type Props = {
	node: Node;
};

export default function NodeRenderer({ node }: Props) {
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
