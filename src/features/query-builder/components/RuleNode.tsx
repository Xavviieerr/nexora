import { RuleNode as RuleType } from "@/core/query/types";

type Props = {
	node: RuleType;
};

export default function RuleNode({ node }: Props) {
	return (
		<div className="border p-2 rounded">
			<span>{node.field}</span>
			<span> {node.operator} </span>
			<span>{String(node.value)}</span>
		</div>
	);
}
