type Props = {
	rows: Record<string, any>[];
};

export default function ResultsTable({ rows }: Props) {
	if (!rows.length) {
		return <p>No results</p>;
	}

	const columns = Object.keys(rows[0]);

	return (
		<table>
			<thead>
				<tr>
					{columns.map((column) => (
						<th key={column}>{column}</th>
					))}
				</tr>
			</thead>

			<tbody>
				{rows.map((row) => (
					<tr key={row.id}>
						{columns.map((column) => (
							<td key={column}>{String(row[column])}</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	);
}
