import { createGroupNode } from "@/core/query/createNode";
import { Node } from "@/core/query/types";

export function createMockTree(): Node {
	return {
		...createGroupNode(),
		children: [
			{
				id: "r1",
				type: "rule",
				field: "age",
				operator: "gt",
				value: 18,
			},
			{
				id: "g1",
				type: "group",
				logic: "AND",
				children: [
					{
						id: "r2",
						type: "rule",
						field: "status",
						operator: "eq",
						value: "active",
					},
				],
			},
		],
	};
}
