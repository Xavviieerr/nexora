"use client";

import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";

import { useQueryStore } from "@/state/queryStore";

type Props = {
	parentId: string;
	childIds: string[];
	children: React.ReactNode;
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

		if (active.id === over.id) {
			return;
		}

		const fromIndex = childIds.indexOf(String(active.id));

		const toIndex = childIds.indexOf(String(over.id));

		if (fromIndex === -1 || toIndex === -1) {
			return;
		}

		reorderChildren(parentId, fromIndex, toIndex);
	}

	return (
		<DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
			{children}
		</DndContext>
	);
}
