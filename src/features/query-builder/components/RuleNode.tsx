import { memo } from "react";
import { RuleNode as RuleType } from "@/core/query/types";
import { useQueryStore } from "@/state/queryStore";
import { operatorMatrix } from "@/core/schema/operatorMatrix";
import { inferInputType } from "@/core/schema/inferInputType";

type Props = {
	node: RuleType;
};

function RuleNodeBase({ node }: Props) {
	const updateNode = useQueryStore((s) => s.updateNode);
	const deleteNode = useQueryStore((s) => s.deleteNode);
	const schema = useQueryStore((s) => s.schema);

	const fieldDef = schema.fields.find((f) => f.name === node.field);
	const availableOperators = fieldDef ? operatorMatrix[fieldDef.type] : [];

	return (
		<div
			style={{
				border: "1px solid gray",
				margin: 5,
				padding: 10,
				display: "flex",
				gap: 10,
				alignItems: "center",
				flexWrap: "wrap",
				borderRadius: 6,
				transition: "background 120ms ease, border 120ms ease",
			}}
		>
			<select
				value={node.field}
				onChange={(e) => {
					const newField = e.target.value;
					const newFieldDef = schema.fields.find((f) => f.name === newField);

					const newOperators = newFieldDef
						? operatorMatrix[newFieldDef.type]
						: [];

					const newOperator = newOperators.length > 0 ? newOperators[0] : "eq";

					updateNode(node.id, (current) =>
						current.type === "rule"
							? {
									...current,
									field: newField,
									operator: newOperator as any,
									value: "",
								}
							: current,
					);
				}}
			>
				<option value="">Select field</option>
				{schema.fields.map((f) => (
					<option key={f.name} value={f.name}>
						{f.name}
					</option>
				))}
			</select>

			<select
				value={node.operator}
				onChange={(e) =>
					updateNode(node.id, (current) =>
						current.type === "rule"
							? {
									...current,
									operator: e.target.value as any,
								}
							: current,
					)
				}
			>
				{availableOperators.map((op) => (
					<option key={op} value={op}>
						{op}
					</option>
				))}
			</select>

			{fieldDef?.type === "enum" ? (
				<select
					value={node.value}
					onChange={(e) =>
						updateNode(node.id, (current) => ({
							...current,
							value: e.target.value,
						}))
					}
				>
					<option value="">Select value</option>
					{fieldDef.options?.map((opt) => (
						<option key={opt} value={opt}>
							{opt}
						</option>
					))}
				</select>
			) : (
				<input
					type={fieldDef ? inferInputType(fieldDef.type) : "text"}
					value={node.value}
					onChange={(e) =>
						updateNode(node.id, (current) => ({
							...current,
							value: e.target.value,
						}))
					}
				/>
			)}

			<button onClick={() => deleteNode(node.id)}>Delete</button>
		</div>
	);
}

const RuleNode = memo(RuleNodeBase);

export default RuleNode;
