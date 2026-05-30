type Props = {
	count: number;
};

export default function ResultsSummary({ count }: Props) {
	return (
		<div>
			<strong>{count}</strong> matching records
		</div>
	);
}
