<template>
  <div class="simulation-inputs">
    <!-- Patient Input Section -->
    <section class="input-card">
      <h3><i class="fas fa-users" /> Patients</h3>
      <div class="input-container">
        <input 
          :value="patients"
          type="text"
          placeholder="Enter patients (e.g., F,H,D,T)" 
          class="input-field"
          :class="{ 'error': patientValidationMessage }"
          required
          @input="handlePatientInput"
        >
        <!-- Only show badges if there's input -->
        <div
          v-if="patients.trim()"
          class="state-badges"
        >
          <span
            v-for="(count, state) in parsePatientStates(patients)" 
            :key="state"
            :class="['state-badge', `state-${state}`]"
          >
            <i :class="getStateIcon(state)" />
            {{ state }}: {{ count }}
          </span>
        </div>
      </div>
    </section>

    <!-- Drug Input Section -->
    <section class="input-card">
      <h3><i class="fas fa-pills" /> Drugs (Optional)</h3>
      <div class="input-container">
        <input 
          :value="drugs"
          type="text"
          placeholder="Enter drugs (e.g., As,I,P)" 
          class="input-field"
          :class="{ 'error': drugValidationMessage }"
          @input="handleDrugInput"
        >
        <!-- Only show drug badges if there's input -->
        <div
          v-if="drugs.trim()"
          class="drug-badges"
        >
          <span
            v-for="drug in drugs.split(',')" 
            :key="drug"
            :class="['drug-badge', `drug-${drug.trim()}`]"
          >
            <i :class="getDrugIcon(drug.trim())" />
            {{ getDrugName(drug.trim()) }}
          </span>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { getStateIcon, getDrugIcon, getDrugName, parsePatientStates } from '../../utils/validation';

defineProps<{
  patients: string;
  drugs: string;
  patientValidationMessage: string;
  drugValidationMessage: string;
}>();

const emit = defineEmits<{
  'update:patients': [value: string];
  'update:drugs': [value: string];
}>();

// Function to capitalize first letter of each item in a comma-separated string
function capitalizeFirstLetters(input: string): string {
  return input
    .split(',')
    .map(item => {
      const trimmed = item.trim();
      return trimmed ? trimmed[0].toUpperCase() + trimmed.slice(1).toLowerCase() : '';
    })
    .filter(Boolean)
    .join(',');
}

// Handler for patient input changes
function handlePatientInput(event: Event) {
  const input = (event.target as HTMLInputElement).value;
  const capitalized = capitalizeFirstLetters(input);
  emit('update:patients', capitalized);
}

// Handler for drug input changes
function handleDrugInput(event: Event) {
  const input = (event.target as HTMLInputElement).value;
  const capitalized = capitalizeFirstLetters(input);
  emit('update:drugs', capitalized);
}
</script> 