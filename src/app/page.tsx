"use client";

import { useState, useEffect } from "react";
import NodeRenderer from "@/features/query-builder/components/NodeRenderer";
import { useQueryStore } from "@/state/queryStore";
import { validateTree } from "@/core/validator/validateTree";

import ExecutionPanel from "@/features/query-execution/components/ExecutionPanel";
import ResultsTable from "@/features/query-execution/components/ResultsTable";
import QueryPreviewPanel from "@/features/query-preview/components/QueryPreviewPanel";
import HistoryPanel from "@/features/query-history/components/HistoryPanel";
import SaveQueryButton from "@/features/query-history/components/SaveQueryButton";
import ImportExportPanel from "@/features/query-import-export/components/ImportExportPanel";
import PresetPanel from "@/features/query-history/components/PresetPanel";
import SchemaSelector from "@/features/query-schema/components/SchemaSleector";

type SidebarTab = "preview" | "history" | "presets";
type Theme = "light" | "dark";

function getInitialTheme(): Theme {
	if (typeof window === "undefined") {
		return "light";
	}

	const stored = localStorage.getItem("nexora-theme");
	if (stored === "light" || stored === "dark") {
		return stored;
	}

	return window.matchMedia("(prefers-color-scheme: dark)").matches
		? "dark"
		: "light";
}

export default function Page() {
	const tree = useQueryStore((s) => s.tree);
	const schema = useQueryStore((s) => s.schema);
	const errors = validateTree(tree, schema);

	const [sidebarTab, setSidebarTab] = useState<SidebarTab>("preview");
	const [theme, setTheme] = useState<Theme>(getInitialTheme);

	useEffect(() => {
		document.documentElement.setAttribute("data-theme", theme);
		localStorage.setItem("nexora-theme", theme);
	}, [theme]);

	const toggleTheme = () => {
		const next = theme === "light" ? "dark" : "light";
		setTheme(next);
	};

	return (
		<div className="nexora-app">
			{/* ── Header ─────────────────────────────────────────── */}
			<header className="nexora-header">
				<div className="nexora-header-left">
					<div className="nexora-wordmark">
						<span className="nexora-wordmark-dot" />
						Nexora
					</div>

					<div
						style={{
							width: 1,
							height: 16,
							background: "var(--border-default)",
							flexShrink: 0,
						}}
					/>

					<span
						style={{
							fontSize: 11,
							color: "var(--text-tertiary)",
							fontWeight: 500,
						}}
					>
						Visual Query Builder
					</span>
				</div>

				<div
					style={{
						display: "flex",
						alignItems: "center",
						gap: "var(--space-2)",
					}}
				>
					{/* Validation indicator */}
					{errors.length === 0 ? (
						<span className="tag tag-success">
							<svg width="7" height="7" viewBox="0 0 8 8" fill="currentColor">
								<circle cx="4" cy="4" r="4" />
							</svg>
							Valid
						</span>
					) : (
						<span className="tag tag-error">
							<svg width="7" height="7" viewBox="0 0 8 8" fill="currentColor">
								<circle cx="4" cy="4" r="4" />
							</svg>
							{errors.length} issue{errors.length !== 1 ? "s" : ""}
						</span>
					)}
					<SchemaSelector />
					<ImportExportPanel />

					<SaveQueryButton />

					<button
						className="theme-toggle"
						onClick={toggleTheme}
						title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
						aria-label="Toggle theme"
					>
						{theme === "light" ? (
							<svg
								width="14"
								height="14"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<circle cx="12" cy="12" r="5" />
								<line x1="12" y1="1" x2="12" y2="3" />
								<line x1="12" y1="21" x2="12" y2="23" />
								<line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
								<line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
								<line x1="1" y1="12" x2="3" y2="12" />
								<line x1="21" y1="12" x2="23" y2="12" />
								<line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
								<line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
							</svg>
						) : (
							<svg
								width="14"
								height="14"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
							</svg>
						)}
					</button>
				</div>
			</header>

			{/* ── Main ───────────────────────────────────────────── */}
			<div className="nexora-main">
				{/* ── Builder Pane ─────────────────────────────────── */}
				<div className="nexora-builder-pane">
					<div className="nexora-builder-toolbar">
						<div
							style={{
								display: "flex",
								alignItems: "center",
								gap: "var(--space-2)",
							}}
						>
							<span
								style={{
									fontSize: 11,
									fontWeight: 600,
									letterSpacing: "0.06em",
									textTransform: "uppercase",
									color: "var(--text-tertiary)",
								}}
							>
								Query
							</span>
							<span style={{ fontSize: 11, color: "var(--text-disabled)" }}>
								{countNodes(tree)} node{countNodes(tree) !== 1 ? "s" : ""}
							</span>
						</div>

						<ExecutionPanel />
					</div>

					{/* Validation bar */}
					{errors.length > 0 && (
						<div
							style={{
								padding: "var(--space-2) var(--space-5)",
								borderBottom: "1px solid var(--border-subtle)",
								flexShrink: 0,
							}}
						>
							<div className="validation-bar">
								<div className="validation-dot" />
								<div style={{ flex: 1 }}>
									{errors.map((err, i) => (
										<span
											key={i}
											className="validation-error-item"
											onClick={() => {
												const el = document.getElementById(
													`node-${err.nodeId}`,
												);
												el?.scrollIntoView({
													behavior: "smooth",
													block: "center",
												});
											}}
										>
											{err.message}
										</span>
									))}
								</div>
							</div>
						</div>
					)}

					<div className="nexora-builder-scroll">
						<NodeRenderer node={tree} />
					</div>

					<ResultsTable />
				</div>

				{/* ── Sidebar ──────────────────────────────────────── */}
				<div className="nexora-sidebar">
					<div className="nexora-sidebar-tabs" role="tablist">
						{(["preview", "history", "presets"] as SidebarTab[]).map((tab) => (
							<button
								key={tab}
								role="tab"
								aria-selected={sidebarTab === tab}
								className={`nexora-sidebar-tab ${sidebarTab === tab ? "active" : ""}`}
								onClick={() => setSidebarTab(tab)}
							>
								{tab.charAt(0).toUpperCase() + tab.slice(1)}
							</button>
						))}
					</div>

					<div className="nexora-sidebar-content" role="tabpanel">
						{sidebarTab === "preview" && <QueryPreviewPanel />}
						{sidebarTab === "history" && <HistoryPanel />}
						{sidebarTab === "presets" && <PresetPanel />}
					</div>
				</div>
			</div>
		</div>
	);
}

function countNodes(node: { type: string; children?: unknown[] }): number {
	if (node.type === "rule") return 1;
	const children =
		(node.children as { type: string; children?: unknown[] }[]) ?? [];
	return 1 + children.reduce((sum, child) => sum + countNodes(child), 0);
}
