import { ref, computed } from 'vue';
import { useSimulationStore } from '../stores/simulation';
import { api } from '../services/api';

export function useSimulation() {
  const store = useSimulationStore();
  const manualPatients = ref('');
  const manualDrugs = ref('');

  const isValid = computed(() => {
    return manualPatients.value && manualDrugs.value;
  });

  async function simulateFromServer() {
    const patients = await api.getPatients();
    const drugs = await api.getDrugs();
    await store.simulateQuarantine({
      patients: patients.join(','),
      drugs
    });
  }

  return {
    manualPatients,
    manualDrugs,
    isValid,
    simulateFromServer
  };
}