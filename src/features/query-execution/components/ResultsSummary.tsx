type Props = {
	count: number;
};

export default function ResultsSummary({ count }: Props) {
	return (
		<span
			style={{
				fontSize: 11,
				color: "var(--color-success)",
				fontWeight: 600,
				fontFamily: "var(--font-mono)",
				background: "var(--color-success-bg)",
				border: "1px solid var(--color-success-border)",
				borderRadius: "var(--radius-sm)",
				padding: "2px 8px",
				whiteSpace: "nowrap",
			}}
		>
			{count} row{count !== 1 ? "s" : ""}
		</span>
	);
}
