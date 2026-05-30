"use client";

import { useQueryPreview } from "../hooks/useQueryPreview";
import QueryPreviewBox from "./QueryPreviewBox";

export default function QueryPreviewPanel() {
	const preview = useQueryPreview();

	return (
		<div style={{ marginTop: 20 }}>
			<h3>Live Query Preview</h3>
			<QueryPreviewBox query={preview} />
		</div>
	);
}
