import { Quarantine } from "./quarantine.js";
import { PatientState, Drug } from "./types/constants.js";
import type { PatientsRegister } from "./types/patientsRegister.js";

// Export all necessary types and constants
export { PatientState, Drug };
export type { PatientsRegister };

// Export Quarantine class
export { Quarantine };

// Default export for compatibility
export default Quarantine;
