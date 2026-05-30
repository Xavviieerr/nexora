import { useState } from "react";
import { executeQuery } from "../engine/executeQuery";
import { users } from "../mock/users";
import { useQueryStore } from "@/state/queryStore";

export function useQueryExecution() {
	const tree = useQueryStore((s) => s.tree);

	const [loading, setLoading] = useState(false);
	const [results, setResults] = useState<any[]>([]);

	const runQuery = async () => {
		setLoading(true);

		await new Promise((resolve) => setTimeout(resolve, 400));

		const matches = executeQuery(tree, users);

		setResults(matches);
		setLoading(false);
	};

	return {
		loading,
		results,
		runQuery,
	};
}
