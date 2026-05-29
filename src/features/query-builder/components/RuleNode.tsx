import { RuleNode as RuleType } from "@/core/query/types";
import { useQueryStore } from "@/state/queryStore";

type Props = {
	node: RuleType;
};

export default function RuleNode({ node }: Props) {
	const deleteNode = useQueryStore((s) => s.deleteNodeById);

	return (
		<div style={{ border: "1px solid gray", margin: 5, padding: 5 }}>
			{node.field || "field"} {node.operator} {String(node.value)}
			<button onClick={() => deleteNode(node.id)}>x</button>
		</div>
	);
}
