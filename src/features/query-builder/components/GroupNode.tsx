import { GroupNode as GroupType } from "@/core/query/types";
import { useQueryStore } from "@/state/queryStore";
import CollapsibleGroup from "./ui/CollapsibleGroup";
import SortableGroup from "../dnd/SortableGroup";
import QueryBuilderDnd from "../dnd/QueryBuilderDnd";
import { ValidationError } from "@/core/validator/types";

type Props = {
	node: GroupType;
	children: React.ReactNode;
	errors?: ValidationError[];
};

export default function GroupNode({ node, children, errors = [] }: Props) {
	const addRule = useQueryStore((s) => s.addRule);
	const addGroup = useQueryStore((s) => s.addGroup);
	const deleteNode = useQueryStore((s) => s.deleteNode);
	const updateNode = useQueryStore((s) => s.updateNode);

	const hasErrors = errors.length > 0;

	return (
		<div
			id={`node-${node.id}`}
			style={{
				border: hasErrors ? "2px solid orange" : "1px solid transparent",
				borderRadius: 8,
				padding: 4,
			}}
		>
			<CollapsibleGroup
				title={
					<div
						style={{
							display: "flex",
							gap: 10,
							alignItems: "center",
						}}
					>
						<span>Group:</span>

						<select
							value={node.logic}
							onChange={(e) =>
								updateNode(node.id, (current) =>
									current.type === "group"
										? {
												...current,
												logic: e.target.value as any,
											}
										: current,
								)
							}
							onClick={(e) => e.stopPropagation()}
						>
							<option value="AND">AND</option>

							<option value="OR">OR</option>
						</select>

						{hasErrors && (
							<span
								style={{
									color: "orange",
									fontSize: 12,
									fontWeight: 600,
								}}
							>
								{errors.length} issue
								{errors.length > 1 ? "s" : ""}
							</span>
						)}
					</div>
				}
			>
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

				<QueryBuilderDnd
					parentId={node.id}
					childIds={node.children.map((child) => child.id)}
				>
					<SortableGroup items={node.children.map((child) => child.id)}>
						<div
							style={{
								paddingLeft: 12,
							}}
						>
							{children}
						</div>
					</SortableGroup>
				</QueryBuilderDnd>
			</CollapsibleGroup>
		</div>
	);
}
