import { RuleNode as RuleType } from "@/core/query/types";
import { useQueryStore } from "@/state/queryStore";

type Props = {
	node: RuleType;
};

export default function RuleNode({ node }: Props) {
	const updateNode = useQueryStore((s) => s.updateNode);
	const deleteNode = useQueryStore((s) => s.deleteNode);

	return (
		<div
			style={{
				border: "1px solid gray",
				margin: 5,
				padding: 10,
				display: "flex",
				gap: 10,
				alignItems: "center",
				flexWrap: "wrap",
			}}
		>
			<input
				placeholder="field"
				value={node.field}
				onChange={(e) =>
					updateNode(node.id, (current) => ({
						...current,
						field: e.target.value,
					}))
				}
			/>

			<select
				value={node.operator}
				onChange={(e) =>
					updateNode(node.id, (current) =>
						current.type === "rule"
							? {
									...current,
									operator: e.target.value as RuleType["operator"],
								}
							: current,
					)
				}
			>
				<option value="eq">equals</option>
				<option value="gt">greater than</option>
				<option value="lt">less than</option>
				<option value="contains">contains</option>
			</select>

			<input
				placeholder="value"
				value={String(node.value)}
				onChange={(e) =>
					updateNode(node.id, (current) => ({
						...current,
						value: e.target.value,
					}))
				}
			/>

			<button onClick={() => deleteNode(node.id)}>Delete</button>
		</div>
	);
}
