"use client";

import { useEffect } from "react";
import { useQueryStore } from "@/state/queryStore";

export default function ExecutionPanel() {
	const undo = useQueryStore((s) => s.undo);
	const redo = useQueryStore((s) => s.redo);

	useEffect(() => {
		const handler = (e: KeyboardEvent) => {
			const isMac = navigator.platform.toLowerCase().includes("mac");

			if (
				(isMac && e.metaKey && e.key === "z") ||
				(!isMac && e.ctrlKey && e.key === "z")
			) {
				if (e.shiftKey) {
					e.preventDefault();
					redo();
				} else {
					e.preventDefault();
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
		<div style={{ marginTop: 20, display: "flex", gap: 10 }}>
			<button onClick={undo}>Undo</button>
			<button onClick={redo}>Redo</button>
		</div>
	);
}
