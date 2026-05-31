import { useQueryStore } from "@/state/queryStore";

export function useQueryIO() {
	const exportQuery = useQueryStore((s) => s.exportQuery);
	const importQuery = useQueryStore((s) => s.importQuery);

	return {
		exportQuery,
		importQuery,
	};
}
