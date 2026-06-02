import { memo } from "react";
import { Operator, QueryValue, RuleNode as RuleType } from "@/core/query/types";

import { useQueryStore } from "@/state/queryStore";
import {
	getAvailableOperators,
	needsValue,
	parseInputValue,
	NO_VALUE_OPERATORS,
} from "../helpers/ruleNodeLogic";

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

	const availableOperators = getAvailableOperators(fieldDef?.type);

	const needsValueFlag = needsValue(node.operator);

	const inputValue =
		typeof node.value === "string" || typeof node.value === "number"
			? node.value
			: "";

	return (
		<div id={`node-${node.id}`} className="query-rule">
			<select
				className="nx-select"
				value={node.field}
				style={{ minWidth: 120 }}
				onChange={(e) => {
					const newField = e.target.value;
					const newFieldDef = schema.fields.find((f) => f.name === newField);

					const safeOperators = newFieldDef
						? getAvailableOperators(newFieldDef.type)
						: [];

					const newOperator: Operator =
						safeOperators.length > 0 ? safeOperators[0] : "eq";

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
									value: NO_VALUE_OPERATORS.includes(selected)
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

			{!needsValueFlag ? (
				<span className="no-value-label" style={{ minWidth: 120, flex: 1 }}>
					no value required
				</span>
			) : (
				<input
					className="nx-input"
					type="text"
					value={inputValue}
					placeholder="value..."
					style={{ minWidth: 100, flex: 1 }}
					onChange={(e) =>
						updateNode(node.id, (current) =>
							current.type === "rule"
								? {
										...current,
										value: parseInputValue(e.target.value, fieldDef?.type),
									}
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
