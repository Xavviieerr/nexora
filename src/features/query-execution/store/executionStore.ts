import { create } from "zustand";

type ExecutionStore = {
	results: any[];
	isRunning: boolean;

	setResults: (results: any[]) => void;
	setRunning: (value: boolean) => void;
};

export const useExecutionStore = create<ExecutionStore>((set) => ({
	results: [],
	isRunning: false,

	setResults: (results) => set({ results }),

	setRunning: (value) => set({ isRunning: value }),
}));
