export type PreviewFormat = "mongo" | "sql" | "json";

export type QueryPreviewResult = {
	mongo: unknown;
	sql: string;
	json: unknown;
};
