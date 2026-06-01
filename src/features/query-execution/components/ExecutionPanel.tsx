"use client";

import { useEffect } from "react";
import { useQueryStore } from "@/state/queryStore";
import { useQueryExecution } from "../hooks/useQueryExecution";
import ExecuteButton from "./ExecuteButton";
import ResultsSummary from "./ResultsSummary";

export default function ExecutionPanel() {
	const undo = useQueryStore((s) => s.undo);
	const redo = useQueryStore((s) => s.redo);
	const { loading, results, runQuery } = useQueryExecution();

	useEffect(() => {
		const handler = (e: KeyboardEvent) => {
			const isMac = navigator.platform.toLowerCase().includes("mac");

			if (
				(isMac && e.metaKey && e.key === "z") ||
				(!isMac && e.ctrlKey && e.key === "z")
			) {
				e.preventDefault();
				if (e.shiftKey) {
					redo();
				} else {
					undo();
				}
			}

			if (
				(e.ctrlKey && e.key === "y") ||
				(isMac && e.metaKey && e.key === "y")
			) {
				e.preventDefault();
				redo();
			}
		};

		window.addEventListener("keydown", handler);
		return () => window.removeEventListener("keydown", handler);
	}, [undo, redo]);

	return (
		<div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
			<button
				className="btn btn-ghost btn-sm btn-icon"
				onClick={undo}
				title="Undo"
				aria-label="Undo"
			>
				<svg
					width="13"
					height="13"
					viewBox="0 0 16 16"
					fill="none"
					stroke="currentColor"
					strokeWidth="1.8"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<path d="M3.5 7.5A4.5 4.5 0 1 1 5 11.5" />
					<path d="M3.5 3.5v4h4" />
				</svg>
			</button>

			<button
				className="btn btn-ghost btn-sm btn-icon"
				onClick={redo}
				title="Redo"
				aria-label="Redo"
			>
				<svg
					width="13"
					height="13"
					viewBox="0 0 16 16"
					fill="none"
					stroke="currentColor"
					strokeWidth="1.8"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<path d="M12.5 7.5A4.5 4.5 0 1 0 11 11.5" />
					<path d="M12.5 3.5v4h-4" />
				</svg>
			</button>

			<div
				style={{
					width: 1,
					height: 14,
					background: "var(--border-default)",
					flexShrink: 0,
				}}
			/>

			<ExecuteButton onRun={runQuery} loading={loading} />

			{results.length > 0 && !loading && <ResultsSummary count={results.length} />}
		</div>
	);
}
