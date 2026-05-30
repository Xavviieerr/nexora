import { createGroupNode } from "@/core/query/createNode";

export const defaultPresets = [
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
