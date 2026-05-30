import { Node } from "@/core/query/types";
import RuleNode from "./RuleNode";
import GroupNode from "./GroupNode";
import SortableNode from "../dnd/SortableNode";

type Props = {
	node: Node;
};

export default function NodeRenderer({ node }: Props) {
	if (node.type === "rule") {
		return (
			<SortableNode id={node.id}>
				<RuleNode node={node} />
			</SortableNode>
		);
	}

	return (
		<SortableNode id={node.id}>
			<GroupNode node={node}>
				{node.children.map((child) => (
					<NodeRenderer key={child.id} node={child} />
				))}
			</GroupNode>
		</SortableNode>
	);
}
