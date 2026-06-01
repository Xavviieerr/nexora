type Props = {
	query: unknown;
};

export default function QueryPreviewBox({ query }: Props) {
	return (
		<pre className="preview-box">{JSON.stringify(query, null, 2)}</pre>
	);
}
