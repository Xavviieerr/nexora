import type { ReactNode } from "react";
import { GroupNode as GroupType, Logic } from "@/core/query/types";
import CollapsibleGroup from "./ui/CollapsibleGroup";
import SortableGroup from "../dnd/SortableGroup";
import QueryBuilderDnd from "../dnd/QueryBuilderDnd";

import { useQueryBuilderActions } from "../hooks/useQueryBuilderActions";
import { getNextLogic } from "../helpers/groupNodeLogic";

type Props = {
	node: GroupType;
	children: ReactNode;
	depth?: number;
};

export default function GroupNode({ node, children, depth = 0 }: Props) {
	const { addRule, addGroup, deleteNode, updateNode } =
		useQueryBuilderActions();

	const isRoot = depth === 0;

	const handleLogicToggle = (e: React.MouseEvent) => {
		e.stopPropagation();

		const next: Logic = getNextLogic(node.logic);

		updateNode(node.id, (current) =>
			current.type === "group" ? { ...current, logic: next } : current,
		);
	};

	const title = (
		<div
			style={{
				display: "flex",
				alignItems: "center",
				gap: "var(--space-2)",
				flex: 1,
				minWidth: 0,
			}}
		>
			{/* Logic badge — click to toggle AND/OR */}
			<button
				className={`logic-badge ${
					node.logic === "AND" ? "logic-badge-and" : "logic-badge-or"
				}`}
				onClick={handleLogicToggle}
				title={`Toggle to ${node.logic === "AND" ? "OR" : "AND"}`}
				style={{
					cursor: "pointer",
					border: "none",
					fontFamily: "inherit",
				}}
			>
				{node.logic}
			</button>

			{!isRoot && (
				<span
					style={{
						fontSize: 11,
						color: "var(--text-tertiary)",
						overflow: "hidden",
						textOverflow: "ellipsis",
						whiteSpace: "nowrap",
					}}
				>
					{node.children.length} condition
					{node.children.length !== 1 ? "s" : ""}
				</span>
			)}

			{/* Action buttons — visible on hover via CSS */}
			<div
				className="query-group-actions"
				style={{ marginLeft: "auto", marginRight: "var(--space-1)" }}
				onClick={(e) => e.stopPropagation()}
			>
				<button
					className="btn btn-ghost btn-sm"
					onClick={() => addRule(node.id)}
					title="Add rule"
				>
					<svg
						width="11"
						height="11"
						viewBox="0 0 16 16"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
					>
						<path d="M8 3v10M3 8h10" />
					</svg>
					Rule
				</button>

				<button
					className="btn btn-ghost btn-sm"
					onClick={() => addGroup(node.id)}
					title="Add group"
				>
					<svg
						width="11"
						height="11"
						viewBox="0 0 16 16"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<rect x="2" y="2" width="12" height="12" rx="2" />
						<path d="M8 5v6M5 8h6" />
					</svg>
					Group
				</button>

				{!isRoot && (
					<button
						className="btn btn-danger btn-sm"
						onClick={() => deleteNode(node.id)}
						title="Delete group"
					>
						<svg
							width="11"
							height="11"
							viewBox="0 0 16 16"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<path d="M3 4h10M6 4V2h4v2M5 4l1 10h4l1-10" />
						</svg>
					</button>
				)}
			</div>
		</div>
	);

	return (
		<div id={`node-${node.id}`}>
			<CollapsibleGroup title={title} defaultOpen depth={depth}>
				<QueryBuilderDnd
					parentId={node.id}
					childIds={node.children.map((child) => child.id)}
				>
					<SortableGroup items={node.children.map((child) => child.id)}>
						<div className="query-group-children">{children}</div>
					</SortableGroup>
				</QueryBuilderDnd>

				{/* Footer add row */}
				<div className="query-group-footer">
					<button
						className="btn btn-ghost btn-sm"
						onClick={() => addRule(node.id)}
					>
						<svg
							width="11"
							height="11"
							viewBox="0 0 16 16"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
						>
							<path d="M8 3v10M3 8h10" />
						</svg>
						Add rule
					</button>

					<button
						className="btn btn-ghost btn-sm"
						onClick={() => addGroup(node.id)}
					>
						<svg
							width="11"
							height="11"
							viewBox="0 0 16 16"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
						>
							<rect x="2" y="2" width="12" height="12" rx="2" />
							<path d="M8 5v6M5 8h6" />
						</svg>
						Add group
					</button>
				</div>
			</CollapsibleGroup>
		</div>
	);
}
