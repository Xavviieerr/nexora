"use client";

import {
	SortableContext,
	verticalListSortingStrategy,
} from "@dnd-kit/sortable";

type Props = {
	items: string[];
	children: React.ReactNode;
};

export default function SortableGroup({ items, children }: Props) {
	return (
		<SortableContext items={items} strategy={verticalListSortingStrategy}>
			{children}
		</SortableContext>
	);
}
