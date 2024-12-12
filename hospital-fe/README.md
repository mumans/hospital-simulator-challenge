# Hospital Simulator Frontend

⚠️ **WARNING: Technical Test Implementation Only**
This repository is intended for technical assessment purposes only. It should not be used in production environments.

## Overview

A Vue.js-based frontend application for managing hospital quarantine simulations. Built with Vite, TypeScript, and @hospital-lib.
## Getting Started

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/hospital-fe.git
cd hospital-fe

# Install dependencies
yarn install

# Link with local hospital-lib (if developing locally)
yarn link @hospital-lib

# Start development server
yarn dev
```

### Available Scripts

```bash
# Start development server
yarn dev

# Build for production
yarn build

# Preview production build
yarn preview

# Run linting
yarn lint

# Fix linting issues
yarn lint:fix
```

## Features

### Patient Management
- View and track patient states (F: Fever, H: Healthy, D: Diabetes, T: Tuberculosis, X: Dead)
- Initialize quarantine with custom patient configurations
- Real-time state visualization with color-coded badges

### Drug Administration
- Select and administer multiple drugs (As: Aspirin, An: Antibiotic, I: Insulin, P: Paracetamol)
- Visual drug selection interface
- Drug interaction tracking

### Simulation Control
- Manual simulation triggering
- Automatic data fetching from server
- Auto-refresh capability (30-second intervals)
- Simulation history tracking (last 10 simulations)

## Extending the System

When new states or drugs are added to the hospital-lib, the frontend needs to be updated:

1. Add translations for the new state/drug in `src/i18n/locales/en.ts`:
```typescript
import { PatientState, Drug } from 'hospital-lib';

export default {
  simulation: {
    states: {
      [PatientState.CANCER]: 'Cancer'  // Add new state
    },
    drugs: {
      [Drug.CHEMOTHERAPY]: 'Chemotherapy'  // Add new drug
    }
  }
}
```

2. Update validation in `src/utils/validation.ts` using library constants:
```typescript
import { PatientState, Drug } from 'hospital-lib';

const VALID_STATES = Object.values(PatientState);
const VALID_DRUGS = Object.values(Drug);
```

3. Add icons for new states/drugs in the frontend components:
```typescript
import { PatientState, Drug } from 'hospital-lib';

export function getStateIcon(state: PatientState): string {
    switch (state) {
        case PatientState.CANCER:
            return 'fas fa-radiation';  // Add icon for new state
        // ... existing cases
    }
}

export function getDrugIcon(drug: Drug): string {
    switch (drug) {
        case Drug.CHEMOTHERAPY:
            return 'fas fa-capsules';  // Add icon for new drug
        // ... existing cases
    }
}
```

4. Add styling for new states/drugs in `src/style.css`:
```css
/* State badge colors */
.state-C { background-color: #9C27B0; } /* Purple for Cancer */

/* Drug badge colors */
.drug-Ch { background-color: #673AB7; }
```

### Testing
After making updates:
1. Start the frontend: `yarn dev`
2. Test the new state/drug combinations in the UI
3. Verify translations and icons appear correctly
4. Check responsive design with new elements

## License

This project is private and intended for technical evaluation only.