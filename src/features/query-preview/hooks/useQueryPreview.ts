import { useMemo } from "react";
import { useQueryStore } from "@/state/queryStore";
import { compileToMongo } from "../engine/compileToMongo";
import { compileSQL } from "../engine/compileToSQL";

export function useQueryPreview() {
	const tree = useQueryStore((s) => s.tree);

	const preview = useMemo(() => {
		return {
			mongo: compileToMongo(tree),
			sql: compileSQL(tree),
		};
	}, [tree]);

	return preview;
}
