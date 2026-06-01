"use client";

import { useState, useRef } from "react";

type Props = {
	title: React.ReactNode;
	children: React.ReactNode;
	defaultOpen?: boolean;
	depth?: number;
};

export default function CollapsibleGroup({
	title,
	children,
	defaultOpen = true,
	depth = 0,
}: Props) {
	const [open, setOpen] = useState(defaultOpen);
	const contentRef = useRef<HTMLDivElement>(null);

	return (
		<div
			className="query-group"
			data-depth={depth % 4}
			style={{ position: "relative" }}
		>
			<div
				className="query-group-header"
				onClick={() => setOpen((p) => !p)}
				role="button"
				tabIndex={0}
				aria-expanded={open}
				onKeyDown={(e) => {
					if (e.key === "Enter" || e.key === " ") {
						e.preventDefault();
						setOpen((p) => !p);
					}
				}}
			>
				<div className="query-group-left">
					<svg
						className={`query-group-chevron ${open ? "open" : ""}`}
						viewBox="0 0 16 16"
						fill="none"
						stroke="currentColor"
						strokeWidth="1.5"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<path d="M6 4l4 4-4 4" />
					</svg>
					{title}
				</div>
			</div>

			<div
				ref={contentRef}
				style={{
					overflow: "hidden",
					transition: "opacity 200ms ease",
					opacity: open ? 1 : 0,
					display: open ? "block" : "none",
				}}
			>
				<div className="query-group-body">{children}</div>
			</div>
		</div>
	);
}
