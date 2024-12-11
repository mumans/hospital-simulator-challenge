<template>
  <section class="history-section">
    <h3><i class="fas fa-history" /> {{ i18n.t('simulation.history.title') }}</h3>
    <div class="history-list">
      <div
        v-for="(result, index) in history" 
        :key="index"
        class="history-item"
      >
        <div class="history-header">
          <span class="timestamp">
            <i class="fas fa-clock" />
            {{ new Date(result.timestamp).toLocaleString() }}
          </span>
        </div>
        <div class="history-content">
          <div class="input-summary">
            <div class="patients">
              <strong>{{ i18n.t('simulation.history.input.patients') }}</strong>
              <div class="state-badges">
                <span
                  v-for="(count, state) in parsePatientStates(result.input.patients)" 
                  :key="state"
                  :class="['state-badge', `state-${state}`]"
                >
                  <i :class="getStateIcon(state as PatientState)" />
                  {{ i18n.t(`simulation.states.${state}`) }}: {{ count }}
                </span>
              </div>
            </div>
            <div class="drugs">
              <strong>{{ i18n.t('simulation.history.input.drugs') }}</strong>
              <div class="drug-badges">
                <span
                  v-for="drug in (Array.isArray(result.input.drugs) ? result.input.drugs : result.input.drugs.split(','))" 
                  :key="drug"
                  :class="['drug-badge', `drug-${drug.trim()}`]"
                >
                  <i :class="getDrugIcon(drug.trim() as Drug)" />
                  {{ getDrugName(drug.trim() as Drug) }}
                </span>
              </div>
            </div>
          </div>
          <div class="output-summary">
            <strong>{{ i18n.t('simulation.history.output.title') }}</strong>
            <div class="state-badges">
              <span
                v-for="(count, state) in result.output" 
                :key="state"
                :class="['state-badge', `state-${state}`]"
              >
                <i :class="getStateIcon(state as PatientState)" />
                {{ i18n.t(`simulation.states.${state}`) }}: {{ count }}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="!history.length"
        class="no-history"
      >
        {{ i18n.t('simulation.history.empty') }}
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { i18n } from '../../i18n';
import type { SimulationResult } from '../../types';
import { 
  getStateIcon, 
  getDrugIcon, 
  getDrugName, 
  parsePatientStates,
  type PatientState,
  type Drug
} from '../../utils/validation';

defineProps<{
  history: SimulationResult[];
}>();
</script>

<style scoped>
.history-section {
  margin-top: 2rem;
  padding: 1rem;
  background: var(--card-bg);
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.history-item {
  padding: 1rem;
  margin-bottom: 1rem;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  background: var(--item-bg);
}

.history-header {
  margin-bottom: 0.5rem;
  color: var(--text-muted);
  font-size: 0.9rem;
}

.history-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.input-summary, .output-summary {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.state-badges, .drug-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.25rem;
}

.state-badge, .drug-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.9rem;
  color: white;
}

/* State badge colors */
.state-F { background-color: orange; }
.state-H { background-color: green; }
.state-D { background-color: red; }
.state-T { background-color: purple; }
.state-X { background-color: gray; }

/* Drug badge colors */
.drug-As { background-color: blue; }
.drug-An { background-color: cyan; }
.drug-I { background-color: indigo; }
.drug-P { background-color: teal; }

.no-history {
  text-align: center;
  color: var(--text-muted);
  padding: 2rem;
  font-style: italic;
}

.timestamp {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

/* Dark mode adjustments */
@media (prefers-color-scheme: dark) {
  .history-item {
    background: rgba(255, 255, 255, 0.05);
  }
  
  .state-badge, .drug-badge {
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  }
}
</style> 