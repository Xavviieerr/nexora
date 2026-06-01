type Props = {
	query: unknown;
};

export default function QueryPreviewBox({ query }: Props) {
	return (
		<pre
			style={{
				background: "#111",
				color: "#0f0",
				padding: 12,
				borderRadius: 6,
				overflow: "auto",
			}}
		>
			{JSON.stringify(query, null, 2)}
		</pre>
	);
}
