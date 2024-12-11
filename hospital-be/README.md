# Hospital Simulator Backend Service

⚠️ **WARNING: Technical Test Implementation Only**
This repository is intended for technical assessment purposes only. It should not be used in production environments. This repository will be removed after the technical evaluation is complete.

A simple REST API service that provides endpoints for managing hospital patient statuses and drug treatments.

## Prerequisites

- Node.js (v20.17.0 or higher)
- Yarn package manager

## Installation

1. Clone the repository
2. Navigate to the hospital-be directory:

```bash
cd hospital-be
```

3. Install dependencies:

```bash
yarn install
```

## Available Scripts

- `yarn start` - Starts the server on port 7200
- `yarn lint` - Runs ESLint to check code style
- `yarn lint:fix` - Automatically fixes ESLint issues where possible
- `yarn format` - Formats code using Prettier
- `yarn audit` - Checks for security vulnerabilities

## API Endpoints

### Get Patient Statuses

**GET /patients**

Returns a comma-separated string of patient statuses.

**Possible status codes:**

- F: Fever
- X: Dead
- T: Tuberculosis
- D: Diabetes
- H: Healthy

**Example response:**

```json
"F,X,T,F"
```

### Get Treatment Prescription

**GET /drugs**

Returns a random treatment or combination of treatments.

**Possible treatments:**

- As: Aspirin
- An: Antibiotic
- I: Insulin
- P: Paracetamol

**Valid combinations:**
- Single treatments: As, An, I, P
- Combined treatments: I,An or P,As
- No treatment: "" (empty string)

**Example response:**

```json
"I,An"
```

## API Documentation

The API is documented using OpenAPI 3.0 specification. You can find the full API documentation in the `openapi.yaml` file.

## License

This project is private and intended for technical evaluation only.
