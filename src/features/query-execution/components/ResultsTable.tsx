"use client";

import { useExecutionStore } from "../store/executionStore";

export default function ResultsTable() {
	const results = useExecutionStore((s) => s.results);

	if (!results.length) return null;

	const columns = Object.keys(results[0] as Record<string, unknown>);

	return (
		<div
			style={{
				padding: "var(--space-4) var(--space-5)",
				borderTop: "1px solid var(--border-subtle)",
				background: "var(--surface-sunken)",
			}}
		>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					marginBottom: "var(--space-3)",
				}}
			>
				<span
					className="section-label"
					style={{ marginBottom: 0, borderBottom: "none", paddingBottom: 0 }}
				>
					Results
				</span>
				<span
					style={{
						fontSize: 11,
						color: "var(--color-success)",
						fontWeight: 600,
						fontFamily: "var(--font-mono)",
					}}
				>
					{results.length} row{results.length !== 1 ? "s" : ""}
				</span>
			</div>

			<div className="results-table-wrap">
				<table className="results-table">
					<thead>
						<tr>
							<th style={{ width: 36, textAlign: "center" }}>#</th>
							{columns.map((col) => (
								<th key={col}>{col}</th>
							))}
						</tr>
					</thead>
					<tbody>
						{results.map((row, i) => (
							<tr key={i}>
								<td
									style={{
										textAlign: "center",
										color: "var(--text-disabled)",
										fontFamily: "var(--font-mono)",
									}}
								>
									{i + 1}
								</td>
								{columns.map((col) => (
									<td key={col}>
										{String((row as Record<string, unknown>)[col] ?? "-")}
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
