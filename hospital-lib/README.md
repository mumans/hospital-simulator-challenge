# Hospital Simulator Library

⚠️ **WARNING: Technical Test Implementation Only**
This repository is intended for technical assessment purposes only. It should not be 
used in production environments. This repository will be removed after the technical 
evaluation is complete.

## Overview

A TypeScript library for managing patient quarantine and drug administration in a simulated hospital environment.

## Usage

```typescript
import { Quarantine, PatientState, Drug } from "hospital-lib";

// Initialize quarantine with patient counts
const quarantine = new Quarantine({
  [PatientState.FEVER]: 1,    // F
  [PatientState.HEALTHY]: 0,  // H
  [PatientState.DIABETES]: 2, // D
  [PatientState.TUBERCULOSIS]: 1, // T
  [PatientState.DEAD]: 0     // X
});

// Administer drugs
quarantine.setDrugs([Drug.ASPIRIN, Drug.INSULIN]);

// Wait 40 days
quarantine.wait40Days();

// Get final patient state
const report = quarantine.report();
```

## Patient States

- `FEVER (F)`: Patient has fever
- `HEALTHY (H)`: Patient is healthy
- `DIABETES (D)`: Patient has diabetes
- `TUBERCULOSIS (T)`: Patient has tuberculosis
- `DEAD (X)`: Patient is deceased

## Available Drugs

- `ASPIRIN (As)`: Treats fever
- `ANTIBIOTIC (An)`: Treats tuberculosis
- `INSULIN (I)`: Required for diabetes
- `PARACETAMOL (P)`: Alternative fever treatment

## Treatment Rules

1. **Fever**
   - Aspirin or Paracetamol -> Patient becomes healthy

2. **Tuberculosis**
   - Antibiotic -> Patient becomes healthy

3. **Diabetes**
   - Requires constant Insulin or patient dies
   - No cure available

4. **Drug Interactions**
   - Paracetamol + Aspirin = Fatal (kills all patients)
   - Insulin + Antibiotic = Causes fever in one healthy patient

## Important Implementation Details

1. **State Changes**
   - Patients can only change state once per simulation
   - Death rules are prioritized over healing rules
   - Drug interactions are processed before individual treatments

2. **Diabetes Management**
   - Diabetic patients die immediately if insulin is not provided
   - Insulin must be present in the drug list to keep diabetic patients alive

3. **Drug Processing Order**
   1. Check for fatal drug combinations (Paracetamol + Aspirin)
   2. Process diabetes (check for insulin)
   3. Apply drug interaction effects (Insulin + Antibiotic)
   4. Apply individual drug effects

## Local Development

### Building Locally

```bash
cd hospital-lib

# Install dependencies
yarn install

# Build the library
yarn build

# Run tests
yarn test

# Run tests with coverage
yarn test:coverage

# Lint code
yarn lint

# Format code
yarn format
```

### Using Local Build in Another Project

```bash
# Go to your project directory
cd your-project

# Link to your local hospital-lib
yarn link hospital-lib

# Start your project
yarn dev
```

### Watch Mode for Development

```bash
# In hospital-lib directory
yarn build --watch
```

### Unlinking

```bash
# In your project directory
yarn unlink hospital-lib

# In hospital-lib directory
yarn unlink
```

## License

This project is private and intended for technical evaluation only.
