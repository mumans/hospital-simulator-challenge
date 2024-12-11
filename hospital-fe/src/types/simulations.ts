import type { Drug, PatientState } from 'hospital-lib';

export interface SimulationState {
  patients: Record<PatientState, number>;
  drugs: Drug[];
  timestamp: Date;
}

export interface ValidationError {
  field: string;
  message: string;
}