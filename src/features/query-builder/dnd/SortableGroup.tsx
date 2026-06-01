"use client";

import type { ReactNode } from "react";
import {
	SortableContext,
	verticalListSortingStrategy,
} from "@dnd-kit/sortable";

type Props = {
	items: string[];
	children: ReactNode;
};

export default function SortableGroup({ items, children }: Props) {
	return (
		<SortableContext items={items} strategy={verticalListSortingStrategy}>
			{children}
		</SortableContext>
	);
}
