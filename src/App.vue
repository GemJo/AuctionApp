<template>
  <v-container>
    <WeatherCard />
    <div>
      <RouterView />
    </div>
    <SnackbarFeedback />
  </v-container>
</template>
<script setup lang="ts">
import { RouterView } from 'vue-router';
import WeatherCard from "@/components/Weather/WeatherCard.vue";
import SnackbarFeedback from "@/components/Misc/Feedback/SnackbarFeedback.vue";


</script>