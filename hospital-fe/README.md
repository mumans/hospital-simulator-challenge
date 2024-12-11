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

## License

This project is private and intended for technical evaluation only.
