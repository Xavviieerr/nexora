type Props = {
	query: {
		mongo: unknown;
		sql: string;
	};
};

export default function QueryPreviewBox({ query }: Props) {
	return (
		<div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
			<pre className="preview-box">{JSON.stringify(query.mongo, null, 2)}</pre>

			<pre className="preview-box">{query.sql || "-- no SQL generated --"}</pre>
		</div>
	);
}
