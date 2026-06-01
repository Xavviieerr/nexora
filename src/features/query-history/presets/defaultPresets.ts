import { createGroupNode } from "@/core/query/createNode";
import { GroupNode } from "@/core/query/types";

type QueryPreset = {
	name: string;
	tree: GroupNode;
};

export const defaultPresets: QueryPreset[] = [
	{
		name: "Active Users",
		tree: {
			...createGroupNode(),
			children: [
				{
					id: "r1",
					type: "rule",
					field: "status",
					operator: "eq",
					value: "active",
				},
			],
		},
	},

	{
		name: "Adults",
		tree: {
			...createGroupNode(),
			children: [
				{
					id: "r2",
					type: "rule",
					field: "age",
					operator: "gt",
					value: 18,
				},
			],
		},
	},
];
