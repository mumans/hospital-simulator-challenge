import { defineStore } from "pinia";
import type { SimulationResult } from "../types";
import { Quarantine } from "hospital-lib";

/**
 * Pinia store for managing simulation state and history
 */
export const useSimulationStore = defineStore("simulation", {
  state: () => ({
    /** Loading state for async operations */
    loading: false,
    /** History of simulation results */
    history: [] as SimulationResult[],
    autoRefresh: false,
    error: null as string | null
  }),

  getters: {
    latestSimulation: (state) => state.history[0],
    hasHistory: (state) => state.history.length > 0
  },

  actions: {
    /**
     * Sets the loading state
     * @param {boolean} value - New loading state
     */
    setLoading(value: boolean) {
      this.loading = value;
    },

    /**
     * Sets the auto-refresh state
     * @param {boolean} value - New auto-refresh state
     */
    setAutoRefresh(value: boolean) {
      this.autoRefresh = value;
    },

    /**
     * Asynchronously simulates quarantine based on input
     * @param {SimulationInput} input - Simulation input parameters
     * @returns {Promise<SimulationResult>} - Simulation result
     */
    async simulateQuarantine(input: { patients: string; drugs: string[] }) {
      this.loading = true;
      this.error = null;
      
      try {
        const quarantine = new Quarantine({
          ...input.patients.split(',').reduce((acc, state) => {
            acc[state] = (acc[state] || 0) + 1;
            return acc;
          }, {} as Record<string, number>)
        });

        if (input.drugs.length > 0) {
          quarantine.setDrugs(input.drugs);
        }

        quarantine.wait40Days();

        const result: SimulationResult = {
          timestamp: new Date(),
          input,
          output: quarantine.report()
        };

        this.addToHistory(result);
        return result;
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'Unknown error occurred';
        throw err;
      } finally {
        this.loading = false;
      }
    },

    /**
     * Adds a new simulation result to history
     * @param {SimulationResult} result - Simulation result to add
     */
    addToHistory(result: SimulationResult) {
      this.history.unshift(result);
      if (this.history.length > 10) {
        this.history.pop();
      }
    },

    /**
     * Clears all simulation history
     */
    clearHistory() {
      this.history = [];
    }
  }
});