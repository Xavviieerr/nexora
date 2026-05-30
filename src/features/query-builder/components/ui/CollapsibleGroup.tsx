"use client";

import { useState } from "react";

type Props = {
	title: React.ReactNode;
	children: React.ReactNode;
};

export default function CollapsibleGroup({ title, children }: Props) {
	const [open, setOpen] = useState(true);

	return (
		<div
			style={{
				border: "1px solid #ccc",
				margin: 10,
				padding: 10,
			}}
		>
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					cursor: "pointer",
					fontWeight: "bold",
				}}
				onClick={() => setOpen((p) => !p)}
			>
				{title}
				<span>{open ? "▼" : "▶"}</span>
			</div>

			{open && <div style={{ marginTop: 10 }}>{children}</div>}
		</div>
	);
}
