<template>
  <v-snackbar
      v-model="feedback.display"
      :color="feedback.config.background"
      variant="elevated"
      class="feedback"
      @update:model-value="feedback.hide()"
  >
    <div class="feedback-message">
      <v-icon :color="feedback.config.color">{{ feedback.config.icon }}</v-icon>
      {{ feedback.config.message }}
    </div>
    <template v-slot:actions>
      <v-btn
          icon
          @click="feedback.hide()"
      >
        <v-icon>close</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>
<script setup lang="ts">
import { useFeedbackStore } from "@/stores/feedback";
const feedback = useFeedbackStore();
</script>