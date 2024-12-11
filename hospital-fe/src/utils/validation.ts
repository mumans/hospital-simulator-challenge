import { i18n } from '../i18n';
import { PatientState, Drug } from 'hospital-lib';

/**
 * Validates a comma-separated string of patient states.
 * @param {string} input - Comma-separated string of patient states (e.g., "F,H,D")
 * @returns {string} Empty string if valid, error message if invalid
 */
export function validatePatients(input: string): string {
  if (!input.trim()) {
    return i18n.t('simulation.patients.validation.required');
  }
  
  const validStates = Object.values(PatientState);
  const states = input.split(',').map(s => s.trim());
  
  if (!states.every(state => validStates.includes(state as PatientState))) {
    return i18n.t('simulation.patients.validation.invalid');
  }
  
  return '';
}

/**
 * Validates a comma-separated string of drugs.
 * @param {string} input - Comma-separated string of drugs (e.g., "As,I,P")
 * @returns {string} Empty string if valid, error message if invalid
 */
export function validateDrugs(input: string): string {
  if (!input.trim()) return '';
  
  const validDrugs = Object.values(Drug);
  const drugs = input.split(',').map(d => d.trim());
  
  if (!drugs.every(drug => validDrugs.includes(drug as Drug))) {
    return i18n.t('simulation.drugs.validation.invalid');
  }
  
  return '';
}

/**
 * Parses a comma-separated string of patient states into a count by state.
 * @param {string} input - Comma-separated string of patient states
 * @returns {Record<PatientState, number>} Object with counts for each state
 * @example
 * parsePatientStates("F,H,F") // { F: 2, H: 1, D: 0, T: 0, X: 0 }
 */
export function parsePatientStates(input: string): Record<PatientState, number> {
  const states = input.split(',').map(s => s.trim()) as PatientState[];
  return states.reduce((acc, state) => {
    acc[state] = (acc[state] || 0) + 1;
    return acc;
  }, {} as Record<PatientState, number>);
}

/**
 * Gets the Font Awesome icon class for a given patient state.
 * @param {PatientState} state - The patient state
 * @returns {string} Font Awesome icon class
 */
export function getStateIcon(state: PatientState): string {
  const icons: Record<PatientState, string> = {
    [PatientState.FEVER]: 'fas fa-thermometer-three-quarters',
    [PatientState.HEALTHY]: 'fas fa-heart',
    [PatientState.DIABETES]: 'fas fa-tint',
    [PatientState.TUBERCULOSIS]: 'fas fa-lungs',
    [PatientState.DEAD]: 'fas fa-skull'
  };
  return icons[state] || 'fas fa-question';
}

/**
 * Gets the Font Awesome icon class for a given drug.
 * @param {Drug} drug - The drug type
 * @returns {string} Font Awesome icon class
 */
export function getDrugIcon(drug: Drug): string {
  const icons: Record<Drug, string> = {
    [Drug.ASPIRIN]: 'fas fa-pills',
    [Drug.ANTIBIOTIC]: 'fas fa-capsules',
    [Drug.INSULIN]: 'fas fa-syringe',
    [Drug.PARACETAMOL]: 'fas fa-tablets'
  };
  return icons[drug] || 'fas fa-question';
}

/**
 * Gets the translated name for a given drug.
 * @param {Drug} drug - The drug type
 * @returns {string} Translated drug name
 */
export function getDrugName(drug: Drug): string {
  return i18n.t(`simulation.drugs.${drug}`);
} 