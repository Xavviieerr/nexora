import { memo } from "react";
import { Operator, QueryValue, RuleNode as RuleType } from "@/core/query/types";
import { useQueryStore } from "@/state/queryStore";
import { operatorMatrix } from "@/core/schema/operatorMatrix";
import { inferInputType } from "@/core/schema/inferInputType";

type Props = {
	node: RuleType;
};

const OPERATOR_LABELS: Record<string, string> = {
	eq: "=",
	neq: "!=",
	gt: ">",
	lt: "<",
	contains: "contains",
	startsWith: "starts with",
	regex: "regex",
	in: "in",
	between: "between",
	isNull: "is null",
	isNotNull: "is not null",
};

function RuleNodeBase({ node }: Props) {
	const updateNode = useQueryStore((s) => s.updateNode);
	const deleteNode = useQueryStore((s) => s.deleteNode);
	const schema = useQueryStore((s) => s.schema);

	const fieldDef = schema.fields.find((f) => f.name === node.field);
	const isFieldValid = Boolean(fieldDef);
	const safeOperators = fieldDef ? operatorMatrix[fieldDef.type] : [];
	const availableOperators = safeOperators;
	const noValueOperators: Operator[] = ["isNull", "isNotNull"];
	const needsValue = !noValueOperators.includes(node.operator);
	const inputValue =
		typeof node.value === "string" || typeof node.value === "number"
			? node.value
			: "";

	const getInputValue = (rawValue: string): QueryValue => {
		if (fieldDef?.type === "number") {
			return rawValue === "" ? "" : Number(rawValue);
		}

		return rawValue;
	};

	return (
		<div id={`node-${node.id}`} className="query-rule">
			<select
				className="nx-select"
				value={node.field}
				style={{ minWidth: 120 }}
				onChange={(e) => {
					const newField = e.target.value;
					const newFieldDef = schema.fields.find((f) => f.name === newField);
					const newOperators = newFieldDef
						? operatorMatrix[newFieldDef.type]
						: [];
					const newOperator: Operator =
						newOperators.length > 0 ? newOperators[0] : "eq";

					updateNode(node.id, (current) =>
						current.type === "rule"
							? {
									...current,
									field: newField,
									operator: newOperator,
									value: "",
								}
							: current,
					);
				}}
			>
				<option value="">field...</option>
				{schema.fields.map((f) => (
					<option key={f.name} value={f.name}>
						{f.name}
					</option>
				))}
			</select>

			<select
				className="nx-select"
				value={node.operator}
				style={{ minWidth: 90 }}
				onChange={(e) => {
					const selected = e.target.value as Operator;
					updateNode(node.id, (current) =>
						current.type === "rule"
							? {
									...current,
									operator: selected,
									value: noValueOperators.includes(selected)
										? ""
										: current.value,
								}
							: current,
					);
				}}
			>
				{availableOperators.map((op) => (
					<option key={op} value={op}>
						{OPERATOR_LABELS[op] ?? op}
					</option>
				))}
			</select>

			{!needsValue ? (
				<span className="no-value-label" style={{ minWidth: 120, flex: 1 }}>
					no value required
				</span>
			) : fieldDef?.type === "enum" ? (
				<select
					className="nx-select"
					value={typeof node.value === "string" ? node.value : ""}
					style={{ minWidth: 120, flex: 1 }}
					onChange={(e) =>
						updateNode(node.id, (current) =>
							current.type === "rule"
								? { ...current, value: e.target.value }
								: current,
						)
					}
				>
					<option value="">value...</option>
					{fieldDef.options?.map((opt) => (
						<option key={opt} value={opt}>
							{opt}
						</option>
					))}
				</select>
			) : (
				<input
					className="nx-input"
					type={fieldDef ? inferInputType(fieldDef.type) : "text"}
					value={inputValue}
					placeholder="value..."
					style={{ minWidth: 100, flex: 1 }}
					onChange={(e) =>
						updateNode(node.id, (current) =>
							current.type === "rule"
								? { ...current, value: getInputValue(e.target.value) }
								: current,
						)
					}
				/>
			)}

			<button
				className="btn btn-danger btn-sm btn-icon query-rule-delete"
				onClick={() => deleteNode(node.id)}
				title="Delete rule"
				aria-label="Delete rule"
			>
				<svg
					width="12"
					height="12"
					viewBox="0 0 16 16"
					fill="none"
					stroke="currentColor"
					strokeWidth="1.8"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<path d="M4 4l8 8M12 4l-8 8" />
				</svg>
			</button>
		</div>
	);
}

const RuleNode = memo(RuleNodeBase);
export default RuleNode;
