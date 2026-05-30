"use client";

import ExecuteButton from "./ExecuteButton";
import ResultsSummary from "./ResultsSummary";
import ResultsTable from "./ResultsTable";
import { useQueryExecution } from "../hooks/useQueryExecution";

export default function ExecutionPanel() {
	const { loading, results, runQuery } = useQueryExecution();

	return (
		<div
			style={{
				marginTop: 24,
				borderTop: "1px solid #ccc",
				paddingTop: 24,
			}}
		>
			<ExecuteButton onRun={runQuery} loading={loading} />

			<ResultsSummary count={results.length} />

			<ResultsTable />
		</div>
	);
}
