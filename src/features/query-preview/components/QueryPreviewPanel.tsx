"use client";

import { useState } from "react";
import { useQueryPreview } from "../hooks/useQueryPreview";
import QueryPreviewBox from "./QueryPreviewBox";

export default function QueryPreviewPanel() {
	const preview = useQueryPreview();
	const [copied, setCopied] = useState(false);

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(JSON.stringify(preview, null, 2));
			setCopied(true);
			setTimeout(() => setCopied(false), 1800);
		} catch {
			/* clipboard unavailable */
		}
	};

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				gap: "var(--space-3)",
			}}
		>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
				}}
			>
				<span
					className="section-label"
					style={{ marginBottom: 0, borderBottom: "none", paddingBottom: 0 }}
				>
					Live Preview
				</span>
				<button
					className="btn btn-ghost btn-sm"
					onClick={handleCopy}
					title="Copy query"
				>
					{copied ? (
						<>
							<svg
								width="11"
								height="11"
								viewBox="0 0 16 16"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<path d="M3 8l4 4 6-7" />
							</svg>
							Copied
						</>
					) : (
						<>
							<svg
								width="11"
								height="11"
								viewBox="0 0 16 16"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<rect x="4" y="4" width="9" height="10" rx="1.5" />
								<path d="M3 11V3a1 1 0 0 1 1-1h8" />
							</svg>
							Copy
						</>
					)}
				</button>
			</div>

			<QueryPreviewBox query={preview} />

			<div style={{ fontSize: 11, color: "var(--text-disabled)" }}>
				Updates in real time as you build.
			</div>
		</div>
	);
}
