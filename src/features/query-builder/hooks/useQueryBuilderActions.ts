import { useQueryStore } from "@/state/queryStore";

export function useQueryBuilderActions() {
	const addRule = useQueryStore((s) => s.addRule);
	const addGroup = useQueryStore((s) => s.addGroup);
	const deleteNode = useQueryStore((s) => s.deleteNode);
	const updateNode = useQueryStore((s) => s.updateNode);

	return {
		addRule,
		addGroup,
		deleteNode,
		updateNode,
	};
}
