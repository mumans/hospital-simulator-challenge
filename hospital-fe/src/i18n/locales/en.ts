export default {
  app: {
    title: 'Hospital Simulator'
  },
  simulation: {
    patients: {
      title: 'Patients',
      placeholder: 'Enter patients (e.g., F,H,D,T)',
      validation: {
        invalid: 'Invalid patient states. Use only F,H,D,T,X separated by commas',
        required: 'Patient states are required'
      }
    },
    drugs: {
      title: 'Drugs (Optional)',
      placeholder: 'Enter drugs (e.g., As,I,P)',
      validation: {
        invalid: 'Invalid drugs. Use only As,An,I,P separated by commas'
      },
      As: 'Aspirin',
      An: 'Antibiotic',
      I: 'Insulin',
      P: 'Paracetamol'
    },
    actions: {
      fetch: 'Fetch Data',
      loading: 'Loading...',
      simulate: 'Simulate',
      startAutoRefresh: 'Start Auto Refresh',
      stopAutoRefresh: 'Stop Auto Refresh'
    },
    history: {
      title: 'Simulation History',
      empty: 'No simulations yet',
      input: {
        patients: 'Input Patients:',
        drugs: 'Applied Drugs:'
      },
      output: {
        title: 'Results:'
      }
    },
    states: {
      F: 'Fever',
      H: 'Healthy',
      D: 'Diabetes',
      T: 'Tuberculosis',
      X: 'Dead'
    },
  }
}; 