"use client";

import { useExecutionStore } from "../store/executionStore";

export default function ResultsTable() {
	const results = useExecutionStore((s) => s.results);

	if (!results.length) {
		return <div>No results</div>;
	}

	return (
		<div>
			<h3>Results ({results.length})</h3>

			<pre>{JSON.stringify(results, null, 2)}</pre>
		</div>
	);
}
