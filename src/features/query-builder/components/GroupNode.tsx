import { GroupNode as GroupType } from "@/core/query/types";
import { useQueryStore } from "@/state/queryStore";

type Props = {
	node: GroupType;
	children: React.ReactNode;
};

export default function GroupNode({ node, children }: Props) {
	const addRule = useQueryStore((s) => s.addRuleToGroup);
	const addGroup = useQueryStore((s) => s.addGroupToGroup);
	const deleteNode = useQueryStore((s) => s.deleteNodeById);

	return (
		<div style={{ border: "1px solid #ccc", padding: 10, margin: 10 }}>
			<div style={{ marginBottom: 8 }}>
				<b>Group: {node.logic}</b>
			</div>

			<div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
				<button onClick={() => addRule(node.id)}>+ Rule</button>
				<button onClick={() => addGroup(node.id)}>+ Group</button>
				<button onClick={() => deleteNode(node.id)}>Delete</button>
			</div>

			<div style={{ paddingLeft: 15 }}>{children}</div>
		</div>
	);
}
