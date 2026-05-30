type Props = {
	onRun: () => void;
	loading: boolean;
};

export default function ExecuteButton({ onRun, loading }: Props) {
	return (
		<button onClick={onRun} disabled={loading}>
			{loading ? "Running..." : "Run Query"}
		</button>
	);
}
