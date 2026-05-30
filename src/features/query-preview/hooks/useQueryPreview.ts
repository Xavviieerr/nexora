import { useMemo } from "react";
import { useQueryStore } from "@/state/queryStore";
import { compileToMongo } from "../engine/compileToMongo";

export function useQueryPreview() {
	const tree = useQueryStore((s) => s.tree);

	const preview = useMemo(() => {
		return compileToMongo(tree);
	}, [tree]);

	return preview;
}
