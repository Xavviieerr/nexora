import { create } from "zustand";
import { QueryRecord } from "../types";

type ExecutionStore = {
	results: QueryRecord[];
	isRunning: boolean;

	setResults: (results: QueryRecord[]) => void;
	setRunning: (value: boolean) => void;
};

export const useExecutionStore = create<ExecutionStore>((set) => ({
	results: [],
	isRunning: false,

	setResults: (results) => set({ results }),

	setRunning: (value) => set({ isRunning: value }),
}));
