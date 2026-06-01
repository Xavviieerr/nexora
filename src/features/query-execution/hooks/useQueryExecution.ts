import { evaluateGroup } from "../engine/evaluateGroup";
import { mockDataset } from "../data/mockDataset";
import { useQueryStore } from "@/state/queryStore";
import { useExecutionStore } from "../store/executionStore";
import { GroupNode } from "@/core/query/types";

export function useQueryExecution() {
	const tree = useQueryStore((s) => s.tree);
	const schemaId = useQueryStore((s) => s.schemaId);
	const isRunning = useExecutionStore((s) => s.isRunning);
	const results = useExecutionStore((s) => s.results);
	const setRunning = useExecutionStore((s) => s.setRunning);
	const setResults = useExecutionStore((s) => s.setResults);

	const runQuery = async () => {
		setRunning(true);

		await new Promise((resolve) => setTimeout(resolve, 400));

		const dataset = mockDataset[schemaId] ?? [];

		if (tree.type !== "group") {
			setResults(dataset);
			setRunning(false);
			return;
		}

		const matches = dataset.filter((record) =>
			evaluateGroup(tree as GroupNode, record),
		);

		setResults(matches);
		setRunning(false);
	};

	return {
		loading: isRunning,
		results,
		runQuery,
	};
}
