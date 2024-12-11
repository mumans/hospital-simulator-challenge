import { Quarantine } from "../quarantine.js";
import { PatientState, Drug } from "../types/constants.js";

describe("Quarantine", () => {
  let quarantine: Quarantine;

  beforeEach(() => {
    quarantine = new Quarantine({
      [PatientState.FEVER]: 1,
      [PatientState.HEALTHY]: 1,
      [PatientState.DIABETES]: 1,
      [PatientState.TUBERCULOSIS]: 1,
      [PatientState.DEAD]: 0
    });
  });

  describe("Constructor and Report", () => {
    it("should initialize with correct patient states", () => {
      const report = quarantine.report();
      expect(report[PatientState.FEVER]).toBe(1);
      expect(report[PatientState.HEALTHY]).toBe(1);
      expect(report[PatientState.DIABETES]).toBe(1);
      expect(report[PatientState.TUBERCULOSIS]).toBe(1);
      expect(report[PatientState.DEAD]).toBe(0);
    });

    it("should create a copy of initial state", () => {
      const initial = {
        [PatientState.FEVER]: 1,
        [PatientState.HEALTHY]: 0,
        [PatientState.DIABETES]: 0,
        [PatientState.TUBERCULOSIS]: 0,
        [PatientState.DEAD]: 0
      };
      const quarantine = new Quarantine(initial);
      initial[PatientState.FEVER] = 2;
      expect(quarantine.report()[PatientState.FEVER]).toBe(1);
    });

    it("should handle undefined values in constructor", () => {
      // @ts-ignore - Testing undefined handling
      quarantine = new Quarantine({});
      expect(quarantine.report()).toEqual({
        [PatientState.FEVER]: 0,
        [PatientState.HEALTHY]: 0,
        [PatientState.DIABETES]: 0,
        [PatientState.TUBERCULOSIS]: 0,
        [PatientState.DEAD]: 0
      });
    });

    it("should handle null values in constructor", () => {
      quarantine = new Quarantine({
        [PatientState.FEVER]: null,
        [PatientState.HEALTHY]: 1,
        [PatientState.DIABETES]: null,
        [PatientState.TUBERCULOSIS]: 1,
        [PatientState.DEAD]: null,
      } as any);
      expect(quarantine.report()).toEqual({
        [PatientState.FEVER]: 0,
        [PatientState.HEALTHY]: 1,
        [PatientState.DIABETES]: 0,
        [PatientState.TUBERCULOSIS]: 1,
        [PatientState.DEAD]: 0
      });
    });
  });

  describe("Drug Administration", () => {
    it("should handle empty drug list", () => {
      quarantine.setDrugs([]);
      quarantine.wait40Days();
      expect(quarantine.report()).toEqual({
        [PatientState.FEVER]: 1,
        [PatientState.HEALTHY]: 1,
        [PatientState.DIABETES]: 0,
        [PatientState.TUBERCULOSIS]: 1,
        [PatientState.DEAD]: 1
      });
    });

    it("should handle multiple drugs correctly", () => {
      quarantine = new Quarantine({
        [PatientState.FEVER]: 1,
        [PatientState.HEALTHY]: 1,
        [PatientState.DIABETES]: 1,
        [PatientState.TUBERCULOSIS]: 1,
        [PatientState.DEAD]: 0
      });
      quarantine.setDrugs([Drug.ASPIRIN, Drug.ANTIBIOTIC, Drug.INSULIN]);
      quarantine.wait40Days();
      const report = quarantine.report();

      // After treatment:
      // - Original Fever patient becomes Healthy (Aspirin)
      // - Healthy patient becomes Fever (Insulin + Antibiotic)
      // - Tuberculosis patient becomes Healthy (Antibiotic)
      // - Diabetes patient stays Diabetic (maintained by Insulin)
      expect(report[PatientState.FEVER]).toBe(1); // Only the Healthy->Fever conversion
      expect(report[PatientState.HEALTHY]).toBe(2); // Original Fever + Tuberculosis cured
      expect(report[PatientState.TUBERCULOSIS]).toBe(0); // Tuberculosis cured by Antibiotic
      expect(report[PatientState.DIABETES]).toBe(1); // Diabetes maintained with insulin
      expect(report[PatientState.DEAD]).toBe(0); // No deaths
    });

    it("should handle all death scenarios", () => {
      quarantine = new Quarantine({
        [PatientState.FEVER]: 1,
        [PatientState.HEALTHY]: 1,
        [PatientState.DIABETES]: 1,
        [PatientState.TUBERCULOSIS]: 1,
        [PatientState.DEAD]: 0
      });
      quarantine.setDrugs([Drug.PARACETAMOL, Drug.ASPIRIN]);
      quarantine.wait40Days();
      const report = quarantine.report();
      expect(report[PatientState.DEAD]).toBe(4); // All patients die due to Paracetamol + Aspirin
      expect(report[PatientState.FEVER]).toBe(0);
      expect(report[PatientState.HEALTHY]).toBe(0);
      expect(report[PatientState.DIABETES]).toBe(0);
      expect(report[PatientState.TUBERCULOSIS]).toBe(0);
    });

    it("should handle dead patients correctly", () => {
      quarantine = new Quarantine({
        [PatientState.FEVER]: 0,
        [PatientState.HEALTHY]: 0,
        [PatientState.DIABETES]: 0,
        [PatientState.TUBERCULOSIS]: 0,
        [PatientState.DEAD]: 1
      });
      quarantine.setDrugs([Drug.ASPIRIN, Drug.INSULIN]);
      quarantine.wait40Days();
      const report = quarantine.report();
      expect(report[PatientState.DEAD]).toBe(1);
      expect(report[PatientState.HEALTHY]).toBe(0);
    });

    it("should skip processing when patient count is 0", () => {
      quarantine = new Quarantine({
        [PatientState.FEVER]: 0,
        [PatientState.HEALTHY]: 0,
        [PatientState.DIABETES]: 0,
        [PatientState.TUBERCULOSIS]: 0,
        [PatientState.DEAD]: 0
      });
      quarantine.setDrugs([Drug.ASPIRIN, Drug.ANTIBIOTIC]);
      quarantine.wait40Days();
      expect(quarantine.report()).toEqual({
        [PatientState.FEVER]: 0,
        [PatientState.HEALTHY]: 0,
        [PatientState.DIABETES]: 0,
        [PatientState.TUBERCULOSIS]: 0,
        [PatientState.DEAD]: 0
      });
    });
  });

  describe("Edge Cases", () => {
    it("should handle empty initial state", () => {
      quarantine = new Quarantine({
        [PatientState.FEVER]: 0,
        [PatientState.HEALTHY]: 0,
        [PatientState.DIABETES]: 0,
        [PatientState.TUBERCULOSIS]: 0,
        [PatientState.DEAD]: 0
      });
      quarantine.setDrugs([Drug.ASPIRIN]);
      quarantine.wait40Days();
      expect(quarantine.report()).toEqual({
        [PatientState.FEVER]: 0,
        [PatientState.HEALTHY]: 0,
        [PatientState.DIABETES]: 0,
        [PatientState.TUBERCULOSIS]: 0,
        [PatientState.DEAD]: 0
      });
    });

    it("should maintain dead patients state", () => {
      quarantine = new Quarantine({
        [PatientState.FEVER]: 0,
        [PatientState.HEALTHY]: 0,
        [PatientState.DIABETES]: 0,
        [PatientState.TUBERCULOSIS]: 0,
        [PatientState.DEAD]: 1
      });
      quarantine.setDrugs([Drug.ASPIRIN, Drug.INSULIN]);
      quarantine.wait40Days();
      expect(quarantine.report()[PatientState.DEAD]).toBe(1);
    });
  });

  describe("Core Rules", () => {
    it("should keep patients sick without proper medicine", () => {
      quarantine = new Quarantine({
        [PatientState.FEVER]: 1,
        [PatientState.TUBERCULOSIS]: 1,
        [PatientState.HEALTHY]: 0,
        [PatientState.DIABETES]: 0,
        [PatientState.DEAD]: 0
      });
      quarantine.setDrugs([Drug.INSULIN]); // Not a cure for either condition
      quarantine.wait40Days();
      const report = quarantine.report();
      expect(report[PatientState.FEVER]).toBe(1);
      expect(report[PatientState.TUBERCULOSIS]).toBe(1);
    });

    it("should only change patient state once per simulation", () => {
      quarantine = new Quarantine({
        [PatientState.FEVER]: 1,
        [PatientState.HEALTHY]: 1,
        [PatientState.DIABETES]: 0,
        [PatientState.TUBERCULOSIS]: 0,
        [PatientState.DEAD]: 0
      });
      // Aspirin cures fever -> patient becomes healthy
      // Insulin+antibiotic should only affect the original healthy patient
      quarantine.setDrugs([Drug.ASPIRIN, Drug.INSULIN, Drug.ANTIBIOTIC]);
      quarantine.wait40Days();
      const report = quarantine.report();
      expect(report[PatientState.HEALTHY]).toBe(1); // Fever patient cured by Aspirin
      expect(report[PatientState.FEVER]).toBe(1);   // Original healthy patient gets fever from insulin+antibiotic
    });

    it("should prioritize death rules over healing", () => {
      quarantine = new Quarantine({
        [PatientState.FEVER]: 1,
        [PatientState.HEALTHY]: 0,
        [PatientState.DIABETES]: 0,
        [PatientState.TUBERCULOSIS]: 0,
        [PatientState.DEAD]: 0
      });
      // Even though aspirin could cure fever, the paracetamol+aspirin combination should kill
      quarantine.setDrugs([Drug.ASPIRIN, Drug.PARACETAMOL]);
      quarantine.wait40Days();
      const report = quarantine.report();
      expect(report[PatientState.DEAD]).toBe(1);
      expect(report[PatientState.HEALTHY]).toBe(0);
    });

    it("should maintain patient state when given wrong medicine", () => {
      quarantine = new Quarantine({
        [PatientState.FEVER]: 1,
        [PatientState.HEALTHY]: 0,
        [PatientState.DIABETES]: 0,
        [PatientState.TUBERCULOSIS]: 0,
        [PatientState.DEAD]: 0
      });

      quarantine.setDrugs([Drug.ANTIBIOTIC]); // Wrong medicine for fever
      quarantine.wait40Days();
      expect(quarantine.report()[PatientState.FEVER]).toBe(1);
    });

    it("should handle multiple drug effects in correct order", () => {
      quarantine = new Quarantine({
        [PatientState.FEVER]: 1,
        [PatientState.HEALTHY]: 1,
        [PatientState.DIABETES]: 1,
        [PatientState.TUBERCULOSIS]: 1,
        [PatientState.DEAD]: 0
      });

      quarantine.setDrugs([Drug.ASPIRIN, Drug.INSULIN, Drug.ANTIBIOTIC]);
      quarantine.wait40Days();
      
      const report = quarantine.report();
      expect(report[PatientState.HEALTHY]).toBe(2); // Fever and TB cured
      expect(report[PatientState.FEVER]).toBe(1);   // One healthy got fever
      expect(report[PatientState.DIABETES]).toBe(1); // Protected by insulin
      expect(report[PatientState.TUBERCULOSIS]).toBe(0); // Cured
      expect(report[PatientState.DEAD]).toBe(0);
    });
  });

  describe("Drug Interactions", () => {
    it("should cause fever in healthy patients when mixing insulin and antibiotic", () => {
      quarantine = new Quarantine({
        [PatientState.HEALTHY]: 2,
        [PatientState.FEVER]: 0,
        [PatientState.DIABETES]: 0,
        [PatientState.TUBERCULOSIS]: 0,
        [PatientState.DEAD]: 0
      });
      quarantine.setDrugs([Drug.INSULIN, Drug.ANTIBIOTIC]);
      quarantine.wait40Days();
      const report = quarantine.report();
      expect(report[PatientState.FEVER]).toBe(1);
      expect(report[PatientState.HEALTHY]).toBe(1);
    });

    it("should kill all patients when mixing paracetamol and aspirin", () => {
      quarantine = new Quarantine({
        [PatientState.FEVER]: 1,
        [PatientState.HEALTHY]: 1,
        [PatientState.DIABETES]: 1,
        [PatientState.TUBERCULOSIS]: 1,
        [PatientState.DEAD]: 0
      });
      quarantine.setDrugs([Drug.PARACETAMOL, Drug.ASPIRIN]);
      quarantine.wait40Days();
      const report = quarantine.report();
      expect(report[PatientState.DEAD]).toBe(4);
      expect(Object.values(report).reduce((sum, count) => sum + count, 0)).toBe(4);
    });
  });

  describe("Individual Drug Effects", () => {
    it("should cure fever with aspirin", () => {
      quarantine = new Quarantine({
        [PatientState.FEVER]: 1,
        [PatientState.HEALTHY]: 0,
        [PatientState.DIABETES]: 0,
        [PatientState.TUBERCULOSIS]: 0,
        [PatientState.DEAD]: 0
      });
      quarantine.setDrugs([Drug.ASPIRIN]);
      quarantine.wait40Days();
      expect(quarantine.report()[PatientState.HEALTHY]).toBe(1);
    });

    it("should cure fever with paracetamol", () => {
      quarantine = new Quarantine({
        [PatientState.FEVER]: 1,
        [PatientState.HEALTHY]: 0,
        [PatientState.DIABETES]: 0,
        [PatientState.TUBERCULOSIS]: 0,
        [PatientState.DEAD]: 0
      });
      quarantine.setDrugs([Drug.PARACETAMOL]);
      quarantine.wait40Days();
      expect(quarantine.report()[PatientState.HEALTHY]).toBe(1);
    });

    it("should cure tuberculosis with antibiotic", () => {
      quarantine = new Quarantine({
        [PatientState.FEVER]: 0,
        [PatientState.HEALTHY]: 0,
        [PatientState.DIABETES]: 0,
        [PatientState.TUBERCULOSIS]: 1,
        [PatientState.DEAD]: 0
      });
      quarantine.setDrugs([Drug.ANTIBIOTIC]);
      quarantine.wait40Days();
      expect(quarantine.report()[PatientState.HEALTHY]).toBe(1);
    });
  });

  describe("Diabetes Management", () => {
    it("should kill diabetic patients without insulin", () => {
      quarantine = new Quarantine({
        [PatientState.DIABETES]: 1,
        [PatientState.FEVER]: 0,
        [PatientState.HEALTHY]: 0,
        [PatientState.TUBERCULOSIS]: 0,
        [PatientState.DEAD]: 0
      });

      quarantine.setDrugs([]); // No drugs = no insulin
      quarantine.wait40Days();
      expect(quarantine.report()).toEqual({
        [PatientState.DIABETES]: 0, // Patient died
        [PatientState.FEVER]: 0,
        [PatientState.HEALTHY]: 0,
        [PatientState.TUBERCULOSIS]: 0,
        [PatientState.DEAD]: 1      // Death without insulin
      });
    });

    it("should keep diabetic patients alive with insulin", () => {
      quarantine = new Quarantine({
        [PatientState.DIABETES]: 1,
        [PatientState.FEVER]: 0,
        [PatientState.HEALTHY]: 0,
        [PatientState.TUBERCULOSIS]: 0,
        [PatientState.DEAD]: 0
      });

      quarantine.setDrugs([Drug.INSULIN]);
      quarantine.wait40Days();
      expect(quarantine.report()).toEqual({
        [PatientState.DIABETES]: 1, // Still diabetic
        [PatientState.FEVER]: 0,
        [PatientState.HEALTHY]: 0,
        [PatientState.TUBERCULOSIS]: 0,
        [PatientState.DEAD]: 0      // But alive with insulin
      });
    });
  });
});
