type Props = {
	onRun: () => void;
	loading: boolean;
};

export default function ExecuteButton({ onRun, loading }: Props) {
	return (
		<button
			className="btn btn-run"
			onClick={onRun}
			disabled={loading}
			title="Run query (Ctrl+Enter / Cmd+Enter)"
		>
			{loading ? (
				<>
					<svg
						width="11"
						height="11"
						viewBox="0 0 16 16"
						fill="currentColor"
						style={{ animation: "spin 1s linear infinite" }}
					>
						<path opacity="0.3" d="M8 2a6 6 0 1 0 6 6h-2a4 4 0 1 1-4-4V2z" />
						<path d="M8 2V0a8 8 0 0 1 8 8h-2a6 6 0 0 0-6-6z" />
					</svg>
					Running
				</>
			) : (
				<>
					<svg width="11" height="11" viewBox="0 0 16 16" fill="currentColor">
						<path d="M4 3l10 5-10 5V3z" />
					</svg>
					Run
				</>
			)}
			<style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
		</button>
	);
}
