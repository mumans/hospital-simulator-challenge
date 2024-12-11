import { Drug } from './types/constants.js';
import type { PatientsRegister } from './types/patientsRegister.js';
export declare class Quarantine {
    private drugs;
    private readonly initialStates;
    private currentStates;
    constructor(patients: PatientsRegister);
    setDrugs(drugs: Drug[]): void;
    wait40Days(): void;
    private hasDeadlyCombination;
    private killAllPatients;
    report(): PatientsRegister;
}
