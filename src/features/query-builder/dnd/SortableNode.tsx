"use client";

import type { ReactNode } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type Props = {
	id: string;
	children: ReactNode;
};

export default function SortableNode({ id, children }: Props) {
	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({
			id,
		});

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	return (
		<div
			ref={setNodeRef}
			style={{
				...style,
				display: "flex",
				alignItems: "flex-start",
				gap: "8px",
			}}
			{...attributes}
		>
			<div
				{...listeners}
				style={{
					cursor: "grab",
					padding: "8px",
					marginTop: "4px",
					color: "#888",
					userSelect: "none",
				}}
				aria-label="Drag node"
			>
				::
			</div>
			<div style={{ flex: 1, minWidth: 0 }}>{children}</div>
		</div>
	);
}
