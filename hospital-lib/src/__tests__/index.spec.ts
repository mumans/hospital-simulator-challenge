import { Quarantine, PatientState, Drug, type PatientsRegister } from "../index.js";

describe("Library exports", () => {
  it("should export Quarantine class", () => {
    const quarantine = new Quarantine({
      [PatientState.FEVER]: 1,
      [PatientState.HEALTHY]: 0,
      [PatientState.DIABETES]: 0,
      [PatientState.TUBERCULOSIS]: 0,
      [PatientState.DEAD]: 0
    });
    expect(quarantine).toBeInstanceOf(Quarantine);
  });

  it("should export PatientState enum", () => {
    expect(PatientState.FEVER).toBe("F");
    expect(PatientState.HEALTHY).toBe("H");
    expect(PatientState.DIABETES).toBe("D");
    expect(PatientState.TUBERCULOSIS).toBe("T");
    expect(PatientState.DEAD).toBe("X");
  });

  it("should export Drug enum", () => {
    expect(Drug.ASPIRIN).toBe("As");
    expect(Drug.ANTIBIOTIC).toBe("An");
    expect(Drug.INSULIN).toBe("I");
    expect(Drug.PARACETAMOL).toBe("P");
  });

  it("should handle PatientsRegister type", () => {
    const register: PatientsRegister = {
      [PatientState.FEVER]: 0,
      [PatientState.HEALTHY]: 0,
      [PatientState.DIABETES]: 0,
      [PatientState.TUBERCULOSIS]: 0,
      [PatientState.DEAD]: 0
    };
    expect(register).toBeDefined();
  });
});
