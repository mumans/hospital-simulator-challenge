/**
 * Interface representing the input parameters for a simulation.
 */
export interface SimulationInput {
  /** Comma-separated string of patient states */
  patients: string;
  /** Array or comma-separated string of drugs to administer */
  drugs: string | string[];
}

/**
 * Interface representing the result of a simulation run.
 */
export interface SimulationResult {
  /** Timestamp when the simulation was run */
  timestamp: Date;
  /** Input parameters used for the simulation */
  input: SimulationInput;
  /** Resulting patient counts by state */
  output: Record<string, number>;
} 