import { executeQuery } from "../engine/executeQuery";
import { users } from "../mock/users";
import { useQueryStore } from "@/state/queryStore";
import { useExecutionStore } from "../store/executionStore";

export function useQueryExecution() {
	const tree = useQueryStore((s) => s.tree);
	const isRunning = useExecutionStore((s) => s.isRunning);
	const results = useExecutionStore((s) => s.results);
	const setRunning = useExecutionStore((s) => s.setRunning);
	const setResults = useExecutionStore((s) => s.setResults);

	const runQuery = async () => {
		setRunning(true);

		await new Promise((resolve) => setTimeout(resolve, 400));

		const matches = executeQuery(tree, users);

		setResults(matches);
		setRunning(false);
	};

	return {
		loading: isRunning,
		results,
		runQuery,
	};
}
