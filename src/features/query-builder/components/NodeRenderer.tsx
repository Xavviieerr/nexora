import { Node } from "@/core/query/types";
import RuleNode from "./RuleNode";
import GroupNode from "./GroupNode";
import SortableNode from "../dnd/SortableNode";

type Props = {
	node: Node;
	isRoot?: boolean;
};

export default function NodeRenderer({ node, isRoot = false }: Props) {
	if (node.type === "rule") {
		const content = <RuleNode node={node} />;
		return isRoot ? content : (
			<SortableNode id={node.id}>
				{content}
			</SortableNode>
		);
	}

	const content = (
		<GroupNode node={node}>
			{node.children.map((child) => (
				<NodeRenderer key={child.id} node={child} />
			))}
		</GroupNode>
	);

	return isRoot ? content : (
		<SortableNode id={node.id}>
			{content}
		</SortableNode>
	);
}
