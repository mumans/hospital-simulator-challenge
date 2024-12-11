import { Drug, PatientState } from './types/constants.js';
export class Quarantine {
    constructor(patients) {
        this.drugs = [];
        const defaultStates = Object.values(PatientState).reduce((acc, state) => {
            acc[state] = 0;
            return acc;
        }, {});
        this.initialStates = Object.entries(patients || {}).reduce((acc, [state, count]) => {
            acc[state] = count === null ? 0 : count;
            return acc;
        }, { ...defaultStates });
        this.currentStates = { ...this.initialStates };
    }
    setDrugs(drugs) {
        this.drugs = drugs || [];
    }
    wait40Days() {
        const newStates = { ...this.currentStates };
        const processedPatients = new Set();
        // 1. Check deadly combinations first
        if (this.hasDeadlyCombination()) {
            this.killAllPatients();
            return;
        }
        // 2. Handle diabetics (they die without insulin)
        if (newStates[PatientState.DIABETES] > 0) {
            if (!this.drugs.includes(Drug.INSULIN)) {
                // Without insulin, diabetics die
                newStates[PatientState.DEAD] += newStates[PatientState.DIABETES];
                newStates[PatientState.DIABETES] = 0;
                processedPatients.add(PatientState.DIABETES);
            }
            // With insulin, they stay diabetic (no state change needed)
        }
        // 3. Process insulin + antibiotic effect
        if (this.drugs.includes(Drug.INSULIN) && this.drugs.includes(Drug.ANTIBIOTIC)) {
            if (newStates[PatientState.HEALTHY] > 0) {
                newStates[PatientState.HEALTHY]--;
                newStates[PatientState.FEVER]++;
                processedPatients.add(PatientState.HEALTHY);
            }
        }
        // 4. Process each state
        Object.entries(this.currentStates).forEach(([state, count]) => {
            if (processedPatients.has(state) || count === 0)
                return;
            switch (state) {
                case PatientState.FEVER:
                    if (this.drugs.includes(Drug.ASPIRIN) || this.drugs.includes(Drug.PARACETAMOL)) {
                        newStates[PatientState.FEVER]--;
                        newStates[PatientState.HEALTHY]++;
                        processedPatients.add(PatientState.FEVER);
                    }
                    break;
                case PatientState.TUBERCULOSIS:
                    if (this.drugs.includes(Drug.ANTIBIOTIC)) {
                        newStates[PatientState.TUBERCULOSIS]--;
                        newStates[PatientState.HEALTHY]++;
                        processedPatients.add(PatientState.TUBERCULOSIS);
                    }
                    break;
                case PatientState.DIABETES:
                    // Only kill diabetic patients if drugs are given but insulin is not included
                    if (!this.drugs.includes(Drug.INSULIN)) {
                        newStates[PatientState.DIABETES]--;
                        newStates[PatientState.DEAD]++;
                        processedPatients.add(PatientState.DIABETES);
                    }
                    break;
            }
        });
        this.currentStates = newStates;
    }
    hasDeadlyCombination() {
        return this.drugs.includes(Drug.PARACETAMOL) && this.drugs.includes(Drug.ASPIRIN);
    }
    killAllPatients() {
        const totalPatients = Object.values(this.currentStates).reduce((sum, count) => sum + count, 0);
        this.currentStates = Object.values(PatientState).reduce((acc, state) => {
            acc[state] = state === PatientState.DEAD ? totalPatients : 0;
            return acc;
        }, {});
    }
    report() {
        return { ...this.currentStates };
    }
}
