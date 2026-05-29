import { GroupNode as GroupType } from "@/core/query/types";

type Props = {
	node: GroupType;
	children: React.ReactNode;
};

export default function GroupNode({ node, children }: Props) {
	return (
		<div className="border p-3 rounded-lg bg-gray-50">
			<div className="font-bold mb-2">Group: {node.logic}</div>

			<div className="pl-4 border-l">{children}</div>
		</div>
	);
}
