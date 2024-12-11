<template>
  <div class="hospital-simulator">
    <!-- Patient Input Section -->
    <SimulationInput
      v-model:patients="manualPatients"
      v-model:drugs="manualDrugs"
      :patient-validation-message="patientValidationMessage"
      :drug-validation-message="drugValidationMessage"
    />

    <!-- Action Buttons -->
    <div class="action-buttons">
      <button
        :disabled="store.loading"
        class="btn btn-primary"
        @click="fetchAndSimulate"
      >
        <i class="fas fa-sync-alt" />
        {{ store.loading ? i18n.t('simulation.actions.loading') : i18n.t('simulation.actions.fetch') }}
      </button>
      
      <button 
        :disabled="isSimulateDisabled"
        class="btn btn-success"
        @click="simulateManual"
      >
        <i class="fas fa-play" />
        {{ i18n.t('simulation.actions.simulate') }}
      </button>

      <button 
        :class="['action-button', 'auto-refresh', { active: autoRefresh }]" 
        @click="toggleAutoRefresh"
      >
        <i :class="['fas', autoRefresh ? 'fa-stop' : 'fa-clock']" />
        {{ autoRefresh ? i18n.t('simulation.actions.stopAutoRefresh') : i18n.t('simulation.actions.startAutoRefresh') }}
      </button>
    </div>

    <!-- Validation Messages -->
    <ValidationMessages 
      :patient-message="patientValidationMessage"
      :drug-message="drugValidationMessage"
    />

    <!-- Simulation History -->
    <SimulationHistory :history="store.history" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted, computed } from 'vue';
import { useSimulationStore } from '../stores/simulation';
import { api } from '../services/api';
import { 
  validatePatients, 
  validateDrugs,
} from '../utils/validation';
import SimulationInput from './simulation/SimulationInput.vue';
import ValidationMessages from './simulation/ValidationMessages.vue';
import SimulationHistory from './simulation/SimulationHistory.vue';
import { i18n } from '../i18n';

const store = useSimulationStore();
const manualPatients = ref('');
const manualDrugs = ref('');
const patientValidationMessage = ref('');
const drugValidationMessage = ref('');
const autoRefresh = ref(false);
let refreshInterval: NodeJS.Timeout | null = null;

// Add computed property for simulate button disabled state
const isSimulateDisabled = computed(() => {
  return Boolean(
    store.loading || 
    patientValidationMessage.value || 
    drugValidationMessage.value || 
    !manualPatients.value.trim()
  );
});

async function fetchAndSimulate() {
  try {
    const [patients, drugs] = await Promise.all([
      api.getPatients(),
      api.getDrugs()
    ]);
    await store.simulateQuarantine({
      patients: patients.join(','),
      drugs
    });
  } catch (error) {
    console.error('Simulation failed:', error);
  }
}

async function simulateManual() {
  if (!manualPatients.value) return;
  
  await store.simulateQuarantine({
    patients: manualPatients.value,
    drugs: manualDrugs.value ? manualDrugs.value.split(',') : []
  });
}

function toggleAutoRefresh() {
  autoRefresh.value = !autoRefresh.value;
  store.setAutoRefresh(autoRefresh.value);
}

watch(autoRefresh, (newValue) => {
  if (newValue) {
    refreshInterval = setInterval(fetchAndSimulate, 30000);
  } else if (refreshInterval) {
    clearInterval(refreshInterval);
    refreshInterval = null;
  }
});

watch(manualPatients, (newValue) => {
  patientValidationMessage.value = validatePatients(newValue);
});

watch(manualDrugs, (newValue) => {
  drugValidationMessage.value = validateDrugs(newValue);
});

onMounted(() => {
  fetchAndSimulate();
});

onUnmounted(() => {
  if (refreshInterval) {
    clearInterval(refreshInterval);
  }
});
</script>
