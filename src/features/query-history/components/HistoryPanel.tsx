"use client";

import { useQueryHistory } from "../hooks/useQueryHistory";

export default function HistoryPanel() {
	const { saveSnapshot, history, restore, currentIndex, undo, redo } =
		useQueryHistory();

	return (
		<div style={{ marginTop: 20 }}>
			<h3>History</h3>

			<button onClick={saveSnapshot}>Save Snapshot</button>

			<button onClick={undo}>Undo</button>
			<button onClick={redo}>Redo</button>

			<ul>
				{history.map((_, i) => (
					<li key={i}>
						<button
							onClick={() => restore(i)}
							style={{
								fontWeight: i === currentIndex ? "bold" : "normal",
							}}
						>
							Snapshot {i + 1}
						</button>
					</li>
				))}
			</ul>
		</div>
	);
}
