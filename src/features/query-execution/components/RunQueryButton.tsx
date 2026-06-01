"use client";

import { executeQuery } from "../engine/executeQuery";
import { mockDataset } from "../data/mockDataset";
import { useExecutionStore } from "../store/executionStore";
import { useQueryStore } from "@/state/queryStore";

export default function RunQueryButton() {
	const tree = useQueryStore((s) => s.tree);

	const setResults = useExecutionStore((s) => s.setResults);

	const setRunning = useExecutionStore((s) => s.setRunning);

	const runQuery = () => {
		setRunning(true);

		const results = executeQuery(tree, mockDataset);

		setResults(results);

		setRunning(false);
	};

	return (
		<button className="btn btn-run" onClick={runQuery}>
			Run Query
		</button>
	);
}
