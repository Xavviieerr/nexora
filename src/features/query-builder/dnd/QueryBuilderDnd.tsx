"use client";

import type { ReactNode } from "react";
import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import { useQueryStore } from "@/state/queryStore";

type Props = {
	parentId: string;
	childIds: string[];
	children: ReactNode;
};

export default function QueryBuilderDnd({
	parentId,
	childIds,
	children,
}: Props) {
	const reorderChildren = useQueryStore((s) => s.reorderChildren);

	function handleDragEnd(event: DragEndEvent) {
		const { active, over } = event;

		if (!over) return;
		if (active.id === over.id) return;

		const activeId = String(active.id);
		const overId = String(over.id);

		const fromIndex = childIds.indexOf(activeId);
		const toIndex = childIds.indexOf(overId);

		if (fromIndex < 0 || toIndex < 0) return;

		reorderChildren(parentId, fromIndex, toIndex);
	}

	return (
		<DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
			{children}
		</DndContext>
	);
}
