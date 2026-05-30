import { GroupNode as GroupType } from "@/core/query/types";
import { useQueryStore } from "@/state/queryStore";
import CollapsibleGroup from "./ui/CollapsibleGroup";

type Props = {
	node: GroupType;
	children: React.ReactNode;
};

export default function GroupNode({ node, children }: Props) {
	const addRule = useQueryStore((s) => s.addRule);
	const addGroup = useQueryStore((s) => s.addGroup);
	const deleteNode = useQueryStore((s) => s.deleteNode);

	return (
		<CollapsibleGroup title={<div>Group: {node.logic}</div>}>
			<div
				style={{
					display: "flex",
					gap: 8,
					marginBottom: 10,
				}}
			>
				<button onClick={() => addRule(node.id)}>+ Rule</button>

				<button onClick={() => addGroup(node.id)}>+ Group</button>

				<button onClick={() => deleteNode(node.id)}>Delete</button>
			</div>

			<div style={{ paddingLeft: 12 }}>{children}</div>
		</CollapsibleGroup>
	);
}
