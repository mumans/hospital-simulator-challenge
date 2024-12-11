<template>
  <div
    v-if="patientMessage || drugMessage"
    class="validation-messages"
  >
    <div
      v-if="patientMessage"
      class="validation-error"
    >
      <i class="fas fa-exclamation-circle" />
      {{ patientMessage }}
    </div>
    <div
      v-if="drugMessage"
      class="validation-error"
    >
      <i class="fas fa-exclamation-circle" />
      {{ drugMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  patientMessage: string;
  drugMessage: string;
}>();
</script> 