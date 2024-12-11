# 🏥 Hospital Quarantine Simulator

⚠️ **WARNING: This is a Technical Test Implementation Only** ⚠️

A monorepo containing a Hospital Quarantine Simulator that demonstrates patient status tracking and treatment management through a simple web interface.

## 📋 Project Overview

This is a Hospital Quarantine Simulator that helps doctors predict patients' states based on their current conditions and administered drugs. The simulator consists of:

### 🏃 Patient States
- 🤒 F: Fever
- ✅ H: Healthy
- 🍯 D: Diabetes
- 🫁 T: Tuberculosis
- ⚰️ X: Dead

### 💊 Available Drugs
- 💊 As: Aspirin
- 🔵 An: Antibiotic
- 💉 I: Insulin
- 💊 P: Paracetamol

### 🔬 Drug Effects
- Aspirin cures Fever
- Antibiotic cures Tuberculosis
- Insulin prevents diabetic patients from dying (does not cure Diabetes)
- If insulin is mixed with antibiotic, healthy people catch Fever
- Paracetamol cures Fever
- Paracetamol kills patient if mixed with aspirin
- A sick patient not receiving the right medicines remains sick

Important Rules:
- During one simulation, a patient can change state only once
- Rules causing Death take precedence over others
- Drugs are administered to all patients (cannot target specific patients)

## 🏗️ Project Structure

### 📚 Core Library (hospital-lib)
- `Quarantine` class implementation
- Patient state management
- Drug interaction rules
- Simulation of drug effects
- Extensible design for new patient states and drugs
- Comprehensive test coverage

[Read more about the library](hospital-lib/README.md)

### 🖥️ Frontend (hospital-fe)
- Real-time patient status visualization
- Server data retrieval button
- Drug administration simulation
- History of last 10 simulation results
- Single-page interface
- Optional Features:
  - Manual input for patients and drugs
  - Automatic refresh toggle (30-second intervals)

[Read more about the frontend](hospital-fe/README.md)

### 🌐 Backend (hospital-be)
- RESTful API endpoints:
  - GET /patients - Returns current hospital patients (e.g., "D,F,F")
  - GET /drugs - Returns drugs to administer (e.g., "As,I")
- Running on port 7200

[Read more about the backend](hospital-be/README.md)

## Implementation Notes

The project follows these key principles:
- KISS (Keep It Simple, Stupid)
- Easy to understand and maintain
- Extensible for future additions
- Well-tested code
- Clear documentation

## Quick Start

1. Clone the repository:
```bash
git clone <repository-url>
```

2. Run the setup script which will:
   - 📦 Install all dependencies
   - 🔨 Build the hospital-lib package
   - 🔗 Link all packages
   - ⚙️ Set up both frontend and backend
```bash
yarn setup
```

3. Start both frontend and backend services:
```bash
yarn start
```

4. 🌐 Open your browser and navigate to `http://localhost:5173/` to access the simulator.

## 📜 Available Scripts

- 🛠️ `yarn setup` - Install, build, and link all packages
- 🚀 `yarn start` - Start both frontend and backend services
- 🖥️ `yarn start:be` - Start only the backend service
- 🎨 `yarn start:fe` - Start only the frontend service
- 🔍 `yarn lint` - Run linting for all workspaces
- ✨ `yarn lint:fix` - Fix linting issues
- 🎯 `yarn format` - Format code
- 📦 `yarn build:lib` - Build the hospital-lib package

## Contributing

1. Create a new branch
2. Make your changes
3. Run tests and linting
4. Submit a pull request

## License

UNLICENSED - Private repository

## Note

### Technical Test Simplifications

For the purpose of this technical test and as per requirements, several simplifications were made:

1. **Monorepo Structure**: All services are in one repository for simplicity. In a real-world scenario:
   - Each service would be in its own repository
   - Shared library would be published as an npm package
   - CI/CD pipelines would be more complex and service-specific

2. **Local Development**: Services run directly on the host machine. In production:
   - Use Docker containers
   - Implement container orchestration (Kubernetes)
   - Set up proper development, staging, and production environments

3. **Authentication**: Not implemented for the test. Production would need:
   - User authentication
   - Role-based access control
   - API security
   - JWT or session management

4. **Database**: Using in-memory data structures. Production would require:
   - Proper database implementation (e.g., PostgreSQL)
   - Data persistence
   - Backup strategies
   - Migration management

## Suggested Enhancements for Production

1. **Infrastructure**
   - Containerization with Docker
   - Kubernetes deployment
   - Load balancing
   - Auto-scaling
   - Health monitoring

2. **Security**
   - SSL/TLS implementation
   - API authentication
   - Rate limiting
   - Security headers
   - Regular security audits

3. **Monitoring & Logging**
   - ELK stack or similar
   - Application performance monitoring
   - Error tracking
   - Usage analytics
   - Alerting system

4. **Testing**
   - Unit tests
   - Integration tests
   - End-to-end tests
   - Load testing
   - Continuous testing in CI/CD

5. **Development Process**
   - Proper git workflow
   - Code review process
   - Automated deployments
   - Feature flags
   - Documentation generation

6. **Data Management**
   - Database implementation
   - Caching strategy
   - Data backup
   - GDPR compliance
   - Audit trails